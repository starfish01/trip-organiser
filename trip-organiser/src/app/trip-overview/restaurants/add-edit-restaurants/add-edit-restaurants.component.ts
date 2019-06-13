import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LocationsService} from '../../../shared/locations.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Location as LocationModel} from "../../../model/location.model";
import {Restaurant} from "../../../model/restaurant.model";
import {RestaurantsService} from "../../../shared/restaurants.service";

@Component({
  selector: 'app-add-edit-restaurants',
  templateUrl: './add-edit-restaurants.component.html',
  styleUrls: ['./add-edit-restaurants.component.scss']
})
export class AddEditRestaurantsComponent implements OnInit {


  restaurantEdit: FormGroup;
  isLoading = false;
  paramsSubscription: Subscription;
  locationParamId: string = null;
  editMode: boolean;
  restaurantId: string;

  constructor(public locationService: LocationsService, private route: ActivatedRoute, private router: Router, private restaurantsService: RestaurantsService) { }

  ngOnInit() {

    this.isLoading = true;

    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.locationParamId = params.id;
      const check = this.locationService.locationCheck(this.locationParamId);
      if (!check) {
        this.router.navigate(['/' + this.locationParamId, 'overview']);
      } else {
        this.initForm();
        this.editMode = false;
      }
    });
        // } else if (this.route.url.value[2].path === 'add') {
      //   this.editMode = false;
      //   this.initForm();
      // } else {
      //   this.editMode = true;
      //
      //   // this.initForm();
      // }



  }

  initForm() {
    let restaurantTitle = '';
    let cuisine = '';
    let restaurantLocation = '';
    let restaurantDescription = '';
    let restaurantCost = '';
    let restaurantUrl = '';



    this.restaurantEdit = new FormGroup({
      restaurantTitle: new FormControl(restaurantTitle, [Validators.required]),
      cuisine: new FormControl(cuisine, [Validators.required]),
      restaurantLocation: new FormControl(restaurantLocation, [Validators.required]),
      restaurantCost: new FormControl(restaurantCost, [Validators.required]),
      restaurantDescription: new FormControl(restaurantDescription, [Validators.required]),
      restaurantUrl: new FormControl(restaurantUrl)
    });
    this.isLoading = false;

  }

  onSubmit() {

    if (this.restaurantEdit.invalid) {
      return;
    }

    const restaurant: Restaurant = {
      id: null,
      restaurantTitle: this.restaurantEdit.value.restaurantTitle,
      cuisine: this.restaurantEdit.value.cuisine,
      restaurantLocation: this.restaurantEdit.value.restaurantLocation,
      restaurantCost: this.restaurantEdit.value.restaurantCost,
      restaurantDescription: this.restaurantEdit.value.restaurantDescription,
      restaurantLocationRef: this.locationParamId,
      restaurantUrl: this.restaurantEdit.value.restaurantUrl,
      created_at: null,
      updatedAt: null,
    };

    this.restaurantsService.addRestaurant(restaurant);
    this.isLoading = true;

      // if (this.isEditMode) {
      //   location.id = this.locationId;
      //   this.locationService.updateLocation(location, this.locationId);
      // } else {
      //   this.locationService.addLocation(location);
      // }

      // this.locationEdit.reset();

  }

}
