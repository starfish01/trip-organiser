import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-edit-restaurants',
  templateUrl: './add-edit-restaurants.component.html',
  styleUrls: ['./add-edit-restaurants.component.scss']
})
export class AddEditRestaurantsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddEditRestaurantsComponent>) { }

  ngOnInit() {
  }

  close(){
  this.dialogRef.close();
  }

}
