import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {UsersInformationService} from '../../../shared/users-information.service';
import {NgForm} from '@angular/forms';
import {Trip} from "../../../model/trip.model";
import {Subscription} from "rxjs";
import {Attendee} from "../../../model/attendee";

@Component({
  selector: 'app-trip-attendees',
  templateUrl: './trip-attendees.component.html',
  styleUrls: ['./trip-attendees.component.scss']
})
export class TripAttendeesComponent implements OnInit {

  @Input('tripAttendees') attendeesIds = [];
  @Input('tripId') tripId: string;
  private currentUser;

  attendeeList: Attendee[] = [];
  private attendeeListSub: Subscription;

  private attendeeNames = [];
  isLoading: boolean;
  isLoadingNewUser: boolean;
  addAttendee: boolean;
  isLoadingUserActionID: string = null;

  constructor(private authService: AuthService, private userService: UsersInformationService) {
  }

  ngOnInit() {
    console.log(this.tripId);
    this.currentUser = this.authService.getFullName();
    this.isLoading = true;

    this.attendeeListSub = this.userService.getAttendeeListUpdateListener().subscribe((data) => {
      this.attendeeList = data;
      this.isLoading = false;
      this.isLoadingNewUser = false;
      this.isLoadingUserActionID = null;
    });
    this.userService.getListOfUsers(this.attendeesIds);

    this.attendeeNames.push();

  }

  onAddAtteendee() {
    this.addAttendee = true;
  }


  onAddEmail(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoadingNewUser = true;

    const addUser = {
      email: form.value.email,
      tripId: this.tripId,
    };

    this.userService.findAndUser(addUser);

  }


  onRemoveClick(attendeeId) {
    this.isLoadingUserAction = true;
    const removeUser = {
      uid: attendeeId,
      tripId: this.tripId,
    };
    this.isLoadingUserActionID = attendeeId;

    this.userService.removeUserFromTrip(removeUser);
  }

}
