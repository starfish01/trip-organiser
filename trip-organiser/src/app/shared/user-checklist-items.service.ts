import { Injectable } from '@angular/core';
import {Attendee} from "../model/attendee";
import {Subject} from "rxjs";
import {UserCheckListItem} from "../model/user-check-list-item.model";

@Injectable({
  providedIn: 'root'
})
export class UserChecklistItemsService {


  private userCheckListItem: UserCheckListItem[] = [];
  private userCheckListItemUpdated = new Subject<UserCheckListItem[]>();

  constructor() { }

  userCheckListItemUpdatedListener() {
    return this.userCheckListItemUpdated.asObservable();
  }

  getChecklistItem() {}

  addCheckListItem() {}
  completeCheckListItem() {}
  removeCheckListItem() {}


}
