import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './core/home-page/home-page.component';
import { LocationOverviewComponent } from './location-overview/location-overview.component';
import { AddEditLocationComponent } from './location-overview/add-edit-location/add-edit-location.component';
import { AddEditRestaurantsComponent } from './location-overview/restaurants/add-edit-restaurants/add-edit-restaurants.component';
import { TripsOverviewComponent } from "./trips-overview/trips-overview.component";
import { TripDashboardComponent } from './trips-overview/trip-dashboard/trip-dashboard.component';

const routes: Routes = [
  { path: 'home', component: TripsOverviewComponent },
  {
    path: ':trip', component: TripDashboardComponent, children: [
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
