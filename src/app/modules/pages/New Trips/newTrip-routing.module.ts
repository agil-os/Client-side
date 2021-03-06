import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTripComponent } from './components/newTrip.component';
import { DashboardView } from '../Budget/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: NewTripComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTripRoutingModule {}
