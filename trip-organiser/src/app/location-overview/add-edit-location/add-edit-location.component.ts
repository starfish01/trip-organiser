import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router, ActivatedRoute, ParamMap, Params} from '@angular/router';
import {Location} from '@angular/common';
import {LocationsService} from 'src/app/shared/locations.service';

import {Location as LocationModel} from 'src/app/model/location.model';
import {TripService} from "../../shared/trip.service";


@Component({
  selector: 'app-add-edit-location',
  templateUrl: './add-edit-location.component.html',
  styleUrls: ['./add-edit-location.component.scss']
})
export class AddEditLocationComponent implements OnInit {

  constructor(
    private tripService: TripService,
    private router: Router,
    private _location: Location,
    private locationService: LocationsService,
    public route: ActivatedRoute) {
  }


  locationEdit: FormGroup;
  editLocation = null;
  isEditMode = false;
  isLoading = false;
  locationId;
  tripId: string;


  ngOnInit() {
    this.isLoading = true;
    this.tripId = this.route.snapshot.parent.url[0].path
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has('id')) {
        this.locationId = paramMap.get('id');

        this.getLocationData();

      } else {
        this.isEditMode = false;
        this.editLocation = true;
        this.initForm();

      }
    });

  }

  getLocationData() {
    this.locationService.getLocation(this.locationId).subscribe(locationData => {
      if (!locationData.location) {
        this.router.navigate(['']);
        // console.log('invalid route');
      }
      this.editLocation = locationData.location;
      this.isEditMode = true;
      this.initForm();
    });
  }

  initForm() {
    let title = '';
    let startDate;
    let endDate;
    let stay;

    if (this.isEditMode) {
      title = this.editLocation.title;
      startDate = new Date(this.editLocation.startDate * 1000);
      endDate = new Date(this.editLocation.endDate * 1000);
      stay = this.editLocation.stay;
    }


    this.locationEdit = new FormGroup({
      title: new FormControl(title, [Validators.required]),
      startDate: new FormControl(startDate, [Validators.required]),
      endDate: new FormControl(endDate, [Validators.required]),
      stay: new FormControl(stay),
    });
    this.isLoading = false;
  }

  onCancel() {
    this._location.back();
  }

  onSubmit() {

    if (this.locationEdit.invalid) {
      return;
    }

    const location: LocationModel = {
      id: null,
      title: this.locationEdit.value.title,
      startDate: this.locationEdit.value.startDate.getTime() / 1000,
      endDate: this.locationEdit.value.endDate.getTime() / 1000,
      stay: this.locationEdit.value.stay,
      tripId: this.tripId
    };

    if (this.isEditMode) {
      location.id = this.locationId;
      this.locationService.updateLocation(location, this.locationId);
    } else {
      this.locationService.addLocation(location);
    }

    // this.locationEdit.reset();

  }

  deleteItem() {
    this.isLoading = true;
    this.locationService.deleteLocation(this.locationId, this.tripId);
  }

}
