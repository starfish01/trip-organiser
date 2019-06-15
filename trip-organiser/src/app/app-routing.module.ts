import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './core/home-page/home-page.component';
import { LocationOverviewComponent } from './location-overview/location-overview.component';
import { AddEditLocationComponent } from './location-overview/add-edit-location/add-edit-location.component';
import {AddEditRestaurantsComponent} from './location-overview/restaurants/add-edit-restaurants/add-edit-restaurants.component';
import {TripsOverviewComponent} from "./trips-overview/trips-overview.component";

const routes: Routes = [
  { path: 'home', component: TripsOverviewComponent },
  // { path: ':location', redirectTo: ':location/overview', pathMatch: 'full'},
  { path: ':location/overview', component: LocationOverviewComponent },
  { path: 'create', component: AddEditLocationComponent },
  { path: ':id/edit', component: AddEditLocationComponent },
  { path: ':id/restaurant/add', component: AddEditRestaurantsComponent },
  { path: ':id/restaurant/edit/:restaurantId', component: AddEditRestaurantsComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
