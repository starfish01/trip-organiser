import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './core/home-page/home-page.component';
import { TripOverviewComponent } from './trip-overview/trip-overview.component';
import { AddEditLocationComponent } from './trip-overview/add-edit-location/add-edit-location.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  // { path: ':location', redirectTo: ':location/overview', pathMatch: 'full'},
  { path: ':location/overview', component: TripOverviewComponent },
  { path: 'create', component: AddEditLocationComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
