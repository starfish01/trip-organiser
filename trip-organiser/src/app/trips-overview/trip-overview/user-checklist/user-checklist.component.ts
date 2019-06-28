import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Attendee} from "../../../model/attendee";
import {Subscription} from "rxjs";
import {UserCheckListItem} from "../../../model/user-check-list-item.model";

@Component({
  selector: 'app-user-checklist',
  templateUrl: './user-checklist.component.html',
  styleUrls: ['./user-checklist.component.scss']
})
export class UserChecklistComponent implements OnInit {

  isLoading: boolean;
  isAddingItem: boolean;

  checkList: UserCheckListItem[] = [];
  // private attendeeListSub: Subscription;

  constructor() {
  }

  ngOnInit() {

  }

  onAddCheckListItem(form: NgForm) {

  }

}
