import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TripService} from '../../../shared/trip.service';
import {NgForm} from '@angular/forms';
import {Trip} from '../../../model/trip.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.scss']
})
export class TripEditComponent implements OnInit {

  constructor(private tripService: TripService, private route: ActivatedRoute, private router: Router, private location: Location) {
  }

  tripId: string;
  tripData: Trip;
  isLoading: boolean;


  ngOnInit() {
    this.isLoading = true;

    this.route.parent.params.subscribe((params: Params) => {
      this.tripId = params.trip;

      this.tripService.getTrip(params.trip).subscribe((data) => {
        this.tripData = data.trip;
        if (data.trip == null) {
          alert('The trip could not be found');
          this.router.navigate(['/home']);
        } else {
          this.isLoading = false;
        }
      });
    });
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;

    this.tripService.updateTrip({tripTitle: form.value.tripTitle, tripId: this.tripId});

  }

  onCancel() {
    this.location.back();
  }

  onDelete() {
    this.isLoading = true;
    this.tripService.deleteTrip(this.tripId);
  }

}
