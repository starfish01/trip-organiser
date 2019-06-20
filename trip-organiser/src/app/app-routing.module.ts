import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './core/home-page/home-page.component';
import { LocationOverviewComponent } from './location-overview/location-overview.component';
import { AddEditLocationComponent } from './location-overview/add-edit-location/add-edit-location.component';
import { AddEditRestaurantsComponent } from './location-overview/restaurants/add-edit-restaurants/add-edit-restaurants.component';
// import { TripsOverviewComponent } from "./trips-overview/trip-parent.component";
import { TripParentComponent } from './trips-overview/trip-parent/trip-parent.component';
import {TripSelectorComponent} from './trips-overview/trip-selector/trip-selector.component';
import {TripsOverviewComponent} from './trips-overview/trips-overview.component';
import {TripOverviewComponent} from "./trips-overview/trip-overview/trip-overview.component";

const routes: Routes = [
  { path: 'home', component: TripsOverviewComponent },
  {
    path: ':trip', component: TripParentComponent, children: [
      { path: '', component: TripOverviewComponent},
      { path: 'create', component: AddEditLocationComponent },
      { path: ':id/edit', component: AddEditLocationComponent },
      { path: ':location/overview', component: LocationOverviewComponent },
      { path: ':location/restaurant/add', component: AddEditRestaurantsComponent },
      { path: ':location/restaurant/edit/:restaurantId', component: AddEditRestaurantsComponent },
    ]
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
