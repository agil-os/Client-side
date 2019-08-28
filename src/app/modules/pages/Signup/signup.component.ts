import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'sign-in',
  templateUrl: '../Signup/signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignComponent implements OnInit {
  user: FormGroup;
  saltRounds = 10;
  inputPassword = 'password';
  username: string;
  userInfo;

  formattedAddress = '';

  options = {
    types: ['(cities)'],
    componentRestriction: {
      country: ['USA'],
    },
  };

  constructor(private router: Router, private get: GetService, private post: PostService) {}
  ngOnInit() {}

  getUserInfo() {
    const username = ((document.getElementById('username') as HTMLInputElement).value);
    // const hometown = ((document.getElementById('hometown') as HTMLInputElement).value);
    const hometown = this.formattedAddress.split(',')[0];
    const email = ((document.getElementById('email') as HTMLInputElement).value);
    const password = ((document.getElementById('password') as HTMLInputElement).value);

    // on submit user info is taken, either we pass the result of this func to the service or we call the func in here
    console.log({
      username,
      hometown,
      email,
      password,
    });

    return {
      username,
      hometown,
      email,
      password,
    };
  }

  handleAddressChange(event: any) {
    console.log('Address change:', event);
    this.formattedAddress = event.formatted_address;
  }

  registerUser() {
    this.userInfo = this.getUserInfo();
    // console.log(typeof user);
    // pass this user to the post request
    // if any of the inputs are empty dont run this query
    return this.post.saveUsers(this.userInfo.username, this.userInfo.hometown, this.userInfo.email, this.userInfo.password)
    .subscribe(
      (data) => {
        // user was successfuly saved
        // redirect to the homepage with the user data to give to the main nav
        // router.navigate(['/home']) and also send the data back for the dashboard and main nav to render
        console.log('user posted', data);
        console.log('state obj', this.userInfo);
        this.router.navigate(['/home'], { state: { data: this.userInfo } });
        // this.router.navigate(['/home']);
      },
      (err) => {
        // user could not be saved
        // display an alert/error saying email already exist or invalid hometown/name etc.
        console.log('user not saved', err);
      },
    );
  }

}
