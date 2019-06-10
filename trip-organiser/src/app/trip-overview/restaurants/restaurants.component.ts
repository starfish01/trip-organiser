import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {AddEditRestaurantsComponent} from './add-edit-restaurants/add-edit-restaurants.component';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit, OnDestroy {

  isFavourite:boolean = false;
  fileNameDialogRef: MatDialogRef<AddEditRestaurantsComponent>;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {

  }




  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.fileNameDialogRef = this.dialog.open(AddEditRestaurantsComponent, dialogConfig);
  }

  ngOnDestroy(): void {

  }

  onFavoriteClick(){
    this.isFavourite = !this.isFavourite;
  }


}
