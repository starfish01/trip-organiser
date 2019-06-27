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

  isLoadingNewUser: boolean;

  addAttendee: boolean;

  constructor(private authService: AuthService, private userService: UsersInformationService) {
  }

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

    this.isLoadingNewUser = true;

    const addUser = {
      email: form.value.email,
      tripId: this.tripId,
    };

    this.userService.findAndUser(addUser).subscribe((data) => {
      console.log(data.userData.id);
      // Check if user exists

      const inArray = this.attendeeNames.some(function(elem) {
        return elem.id === data.userData.id;
      });

      if (!inArray) {
        this.attendeeNames.push(data.userData);
      }

      this.isLoadingNewUser = false;
      form.resetForm();

      this.addAttendee = false;

    });
  }


  onRemoveClick(attendeeId) {

    const removeUser = {
      uid: attendeeId,
      tripId: this.tripId,
    };

    this.userService.removeUserFromTrip(removeUser)
  }

}
