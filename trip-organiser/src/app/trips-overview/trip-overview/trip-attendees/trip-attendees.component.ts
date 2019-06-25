import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {UsersInformationService} from "../../../shared/users-information.service";

@Component({
  selector: 'app-trip-attendees',
  templateUrl: './trip-attendees.component.html',
  styleUrls: ['./trip-attendees.component.scss']
})
export class TripAttendeesComponent implements OnInit {

  @Input('tripAttendees') attendeesIds = [];
  private currentUser;

  private attendeeNames = [];

  constructor(private authService: AuthService, private userService:UsersInformationService) { }

  ngOnInit() {
    this.currentUser = this.authService.getFullName();

    console.log(this.attendeesIds)

    this.userService.getListOfUsers(this.attendeesIds).subscribe((data)=>{
      console.log(data)
      this.attendeeNames = data.usersNames;
    });

    this.attendeeNames.push();

  }

}
