import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TripService } from 'src/app/shared/trip.service';
import { Trip } from 'src/app/model/trip.model';

@Component({
  selector: 'app-add-edit-trip',
  templateUrl: './add-edit-trip.component.html',
  styleUrls: ['./add-edit-trip.component.scss']
})
export class AddEditTripComponent implements OnInit {

  addTrip = false;
  addEditTrip: FormGroup;
  isLoading: boolean = false;
  @Input('tripAdded') tripBeingAdded: boolean;

  @Output() userCreatedTrip = new EventEmitter<Trip>();


  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  onAddTrip() {
    this.addTrip = true;
  }

  initForm() {
    const tripTitle = '';

    this.addEditTrip = new FormGroup({
      tripTitle: new FormControl(tripTitle, [Validators.required]),
    });

  }

  onSubmit() {
    if (this.addEditTrip.invalid) {
      return;
    }

    this.userCreatedTrip.emit(
      this.addEditTrip.value
    );

    this.onCancel();

  }

  onCancel() {
    this.addEditTrip.reset();
    this.addTrip = false;
  }

}
