import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocationsService} from '../../../shared/locations.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Location as LocationModel} from '../../../model/location.model';
import {Restaurant} from '../../../model/restaurant.model';
import {RestaurantsService} from '../../../shared/restaurants.service';

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
  restaurantDetails: Restaurant;

  constructor(public locationService: LocationsService,
              private route: ActivatedRoute,
              private router: Router,
              private restaurantsService: RestaurantsService) {
  }

  ngOnInit() {

    this.isLoading = true;

    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.locationParamId = params.id;
      this.restaurantId = params.restaurantId;
      const check = this.locationService.locationCheck(this.locationParamId);
      if (!check) {
        this.router.navigate(['/' + this.locationParamId, 'overview']);
      } else if (params.restaurantId) {
        this.editMode = true;
        this.restaurantDetails = this.restaurantsService.getRestaurant(params.restaurantId);
        if (!this.restaurantsService) {
          console.log('ERROR');
          this.router.navigate(['/']);
        } else {
          this.initForm();
        }
      } else {
        this.initForm();
        this.editMode = false;
      }
    });
  }

  initForm() {
    let restaurantTitle = '';
    let cuisine = '';
    let restaurantLocation = '';
    let restaurantDescription = '';
    let restaurantCost = '';
    let restaurantUrl = '';

    if (this.editMode) {
      restaurantTitle = this.restaurantDetails.restaurantTitle;
      cuisine = this.restaurantDetails.cuisine;
      restaurantLocation = this.restaurantDetails.restaurantLocation;
      restaurantDescription = this.restaurantDetails.restaurantDescription;
      restaurantCost = this.restaurantDetails.restaurantCost;
      restaurantUrl = this.restaurantDetails.restaurantUrl;
    }

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

    if (this.editMode) {
      restaurant.id = this.restaurantId;
      this.restaurantsService.updateRestaurant(restaurant, this.restaurantId);
    } else {
      this.restaurantsService.addRestaurant(restaurant);
    }

    this.isLoading = true;
  }

  onClickDeleteItem() {
    this.restaurantsService.deleteRestaurant(this.restaurantDetails.id, this.locationParamId);
  }

  onCancel() {
    this.router.navigate([this.locationParamId, 'overview'], {queryParams:{ position: 'food'}});
  }
}
