import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './core/header/header.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SubHeaderLocationsComponent} from './core/sub-header-locations/sub-header-locations.component';
import {MatButtonModule} from '@angular/material/button';
import {LocationOverviewComponent} from './location-overview/location-overview.component';
import {HomePageComponent} from './core/home-page/home-page.component';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddEditLocationComponent} from './location-overview/add-edit-location/add-edit-location.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';

import {FlexLayoutModule} from '@angular/flex-layout';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {
  MatDialogModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatIconModule,
  MatSelectModule,
  MatTabsModule, MatTooltipModule
} from '@angular/material';
import {RestaurantsComponent} from './location-overview/restaurants/restaurants.component';
import {AddEditRestaurantsComponent} from './location-overview/restaurants/add-edit-restaurants/add-edit-restaurants.component';
import {TripsOverviewComponent} from './trips-overview/trips-overview.component';
import {TripSelectorComponent} from './trips-overview/trip-selector/trip-selector.component';
import {AddEditTripComponent} from './trips-overview/add-edit-trip/add-edit-trip.component';
import {TripParentComponent} from './trips-overview/trip-parent/trip-parent.component';
import {TripOverviewComponent} from './trips-overview/trip-overview/trip-overview.component';
import {SitesComponent} from './location-overview/sites/sites.component';
import {AddEditSitesComponent} from './location-overview/sites/add-edit-sites/add-edit-sites.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthGuard} from './auth/auth.guard';
import {FooterComponent} from './core/footer/footer.component';
import {AuthInterceptor} from './auth/auth-interceptor';
import {ErrorInterceptor} from './error-interceptor';
import {ErrorComponent} from './core/error/error.component';
import { TripAttendeesComponent } from './trips-overview/trip-overview/trip-attendees/trip-attendees.component';
import { UserChecklistComponent } from './trips-overview/trip-overview/user-checklist/user-checklist.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubHeaderLocationsComponent,
    LocationOverviewComponent,
    HomePageComponent,
    AddEditLocationComponent,
    RestaurantsComponent,
    AddEditRestaurantsComponent,
    TripsOverviewComponent,
    TripSelectorComponent,
    AddEditTripComponent,
    TripParentComponent,
    TripOverviewComponent,
    SitesComponent,
    AddEditSitesComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    ErrorComponent,
    TripAttendeesComponent,
    UserChecklistComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatExpansionModule,
    FormsModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTooltipModule

  ],
  entryComponents: [
    AddEditRestaurantsComponent,
    ErrorComponent
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
