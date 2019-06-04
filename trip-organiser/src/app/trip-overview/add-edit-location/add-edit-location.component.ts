import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { LocationsService } from 'src/app/shared/locations.service';

import {Location as LocationModel} from 'src/app/model/location.model'



@Component({
  selector: 'app-add-edit-location',
  templateUrl: './add-edit-location.component.html',
  styleUrls: ['./add-edit-location.component.scss']
})
export class AddEditLocationComponent implements OnInit {

  constructor(router: Router,private _location: Location, private locationService:LocationsService) { }

  locationEdit: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let title = ''
    let startDate = ''
    let endDate = ''
    this.locationEdit = new FormGroup({
      'title': new FormControl(title, [Validators.required]),
      'startDate': new FormControl(startDate, [Validators.required]),
      'endDate': new FormControl(endDate, [Validators.required])
    })
  }

  onCancel() {
    this._location.back();
  }

  onSubmit() {

    const location: LocationModel= {
      'id':null,
      'title':this.locationEdit.value.title,
      'startDate':this.locationEdit.value.startDate,
      'endDate':this.locationEdit.value.endDate
    }

    this.locationService.addLocation(location)

    this.locationEdit.reset();

  }

}
