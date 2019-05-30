import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-add-edit-location',
  templateUrl: './add-edit-location.component.html',
  styleUrls: ['./add-edit-location.component.scss']
})
export class AddEditLocationComponent implements OnInit {

  constructor() { }

  locationEdit:FormGroup;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let title = ''
    let startDate = ''
    let endDate = ''
    this.locationEdit = new FormGroup({
      'title': new FormControl(title,[Validators.required]),
      'startDate':new FormControl(startDate,[Validators.required]),
      'endDate': new FormControl(endDate,[Validators.required])
    })
  }

}
