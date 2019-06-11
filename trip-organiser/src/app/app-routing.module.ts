import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './core/home-page/home-page.component';
import { TripOverviewComponent } from './trip-overview/trip-overview.component';
import { AddEditLocationComponent } from './trip-overview/add-edit-location/add-edit-location.component';
import {AddEditRestaurantsComponent} from './trip-overview/restaurants/add-edit-restaurants/add-edit-restaurants.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  // { path: ':location', redirectTo: ':location/overview', pathMatch: 'full'},
  { path: ':location/overview', component: TripOverviewComponent },
  { path: 'create', component: AddEditLocationComponent },
  { path: ':id/edit', component: AddEditLocationComponent },
  { path: ':id/restaurant/add', component: AddEditRestaurantsComponent },
  { path: ':id/restaurant/edit/:id', component: AddEditRestaurantsComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
