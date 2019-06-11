import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ParamMap} from "@angular/router";

@Component({
  selector: 'app-add-edit-restaurants',
  templateUrl: './add-edit-restaurants.component.html',
  styleUrls: ['./add-edit-restaurants.component.scss']
})
export class AddEditRestaurantsComponent implements OnInit {

  isEditMode:boolean = false;
  restaurantEdit: FormGroup;
  isLoading = false;
  editRestaurant = null;
  restaurantId;

  constructor(private dialogRef: MatDialogRef<AddEditRestaurantsComponent>) { }

  ngOnInit() {
    this.isLoading = true;
    this.initForm();
  }

  initForm() {
    let restauranttitle = '';
    let cuisine = '';
    let restaurantLocation = '';
    let restaurantMenu = '';
    let restaurantDescription = '';

    this.restaurantEdit = new FormGroup({
      restauranttitle: new FormControl(restauranttitle, [Validators.required]),
      cuisine: new FormControl(cuisine, [Validators.required]),
      restaurantLocation: new FormControl(restaurantLocation, [Validators.required]),
      restaurantMenu: new FormControl(restaurantMenu),
      restaurantDescription: new FormControl(restaurantDescription, [Validators.required])


    });
    this.isLoading = false;

  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {

  }

}
