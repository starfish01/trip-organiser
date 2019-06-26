import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {UsersInformationService} from '../../../shared/users-information.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-trip-attendees',
  templateUrl: './trip-attendees.component.html',
  styleUrls: ['./trip-attendees.component.scss']
})
export class TripAttendeesComponent implements OnInit {

  @Input('tripAttendees') attendeesIds = [];
  @Input('tripId') tripId: string;
  private currentUser;

  private attendeeNames = [];
  isLoading: boolean;

  addAttendee: boolean;

  constructor(private authService: AuthService, private userService: UsersInformationService) { }

  ngOnInit() {
    console.log(this.tripId);
    this.currentUser = this.authService.getFullName();
    this.isLoading = true;
    this.userService.getListOfUsers(this.attendeesIds).subscribe((data) => {
      this.attendeeNames = data.usersNames;
      this.isLoading = false;
    });

    this.attendeeNames.push();

  }

  onAddAtteendee() {
    this.addAttendee = true;
  }


  onAddEmail(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // addUser = {
    //   email: form.value.email,
    //   id: this.tripId,
    // };

    // console.log(addUser);

  }

}
