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
import {AddEditSitesComponent} from "./location-overview/sites/add-edit-sites/add-edit-sites.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {AuthGuard} from "./auth/auth.guard";
import {TripEditComponent} from "./trips-overview/trip-overview/trip-edit/trip-edit.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  { path: 'home', component: TripsOverviewComponent, canActivate: [AuthGuard] },
  {
    path: ':trip', component: TripParentComponent, canActivate: [AuthGuard], children: [
      { path: '', component: TripOverviewComponent},
      { path: 'edit', component: TripEditComponent },
      { path: 'create', component: AddEditLocationComponent },
      { path: ':id/edit', component: AddEditLocationComponent },
      { path: ':location/overview', component: LocationOverviewComponent },
      { path: ':location/restaurant/add', component: AddEditRestaurantsComponent },
      { path: ':location/restaurant/edit/:restaurantId', component: AddEditRestaurantsComponent },
      { path: ':location/site/add', component: AddEditSitesComponent },
      { path: ':location/site/edit/:siteId', component: AddEditSitesComponent }
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
