import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { LocationsService } from 'src/app/shared/locations.service';

import { Location as LocationModel } from 'src/app/model/location.model'



@Component({
  selector: 'app-add-edit-location',
  templateUrl: './add-edit-location.component.html',
  styleUrls: ['./add-edit-location.component.scss']
})
export class AddEditLocationComponent implements OnInit {

  constructor(private router: Router, private _location: Location, private locationService: LocationsService, public route: ActivatedRoute) { }

  locationEdit: FormGroup;
  editLocation = null;
  isEditMode = false;
  isLoading = false;



  ngOnInit() {
    this.isLoading = true;

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        const locationId = paramMap.get('id')

        this.getLocationData(locationId)

      } else {
        this.isEditMode = false;
        this.editLocation = true;
        this.initForm();

      }
    })
    
  }

  getLocationData(locationId) {
    this.locationService.getLocation(locationId).subscribe(locationData => {
      if (!locationData.location) {
        this.router.navigate([''])
        console.log('invalid route')
      }
      this.editLocation = locationData.location
      this.isEditMode = true;
      this.initForm();
    })
  }

  initForm() {
    console.log('here')
    let title = ''
    let startDate;
    let endDate;

    if (this.isEditMode) {
      console.log(this.editLocation)
      title = this.editLocation.title
      startDate = new Date(this.editLocation.startDate*1000)
      endDate = new Date(this.editLocation.endDate*1000)
    }



    this.locationEdit = new FormGroup({
      'title': new FormControl(title, [Validators.required]),
      'startDate': new FormControl(startDate, [Validators.required]),
      'endDate': new FormControl(endDate, [Validators.required])
    })
    this.isLoading = false;
  }

  onCancel() {
    this._location.back();
  }

  onSubmit() {

    const location: LocationModel = {
      'id': null,
      'title': this.locationEdit.value.title,
      'startDate': this.locationEdit.value.startDate.getTime() / 1000,
      'endDate': this.locationEdit.value.endDate.getTime() / 1000
    }

    this.locationService.addLocation(location)

    this.locationEdit.reset();

  }

}
