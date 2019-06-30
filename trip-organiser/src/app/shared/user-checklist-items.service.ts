import {Injectable} from '@angular/core';
import {Attendee} from "../model/attendee";
import {Subject} from "rxjs";
import {UserCheckListItem} from "../model/user-check-list-item.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";


const BACKEND_URL = environment.apiURL + '/user-checklist/';

@Injectable({
  providedIn: 'root'
})
export class UserChecklistItemsService {


  private userCheckListItem: UserCheckListItem[] = [];
  private userCheckListItemUpdated = new Subject<UserCheckListItem[]>();

  constructor(private http: HttpClient, private router: Router) {
  }

  userCheckListItemUpdatedListener() {
    return this.userCheckListItemUpdated.asObservable();
  }

  getChecklistItems(tripId) {
    this.http.get<{ message: string, checklistItems: UserCheckListItem[] }>(BACKEND_URL + tripId)
      .subscribe((checkListData) => {
        this.userCheckListItem = checkListData.checklistItems;
        this.userCheckListItemUpdated.next([...this.userCheckListItem]);
      });
  }

  addCheckListItem(data) {
    this.http.post<{ message: string, checklistItem: UserCheckListItem }>(BACKEND_URL + 'add-item/', data).subscribe((response) => {
      this.userCheckListItem.push(response.checklistItem);
      this.userCheckListItemUpdated.next([...this.userCheckListItem]);
    });
  }

  removeCheckListItem(checklistItemId) {
    this.http.post<{ message: string }>(BACKEND_URL + 'remove-item', {checklistItemId})
      .subscribe((response) => {
        console.log(response);
        const index = this.userCheckListItem.findIndex(el => el._id === checklistItemId);
        if (index !== -1) {
          this.userCheckListItem.splice(index, 1);
        }
        this.userCheckListItemUpdated.next([...this.userCheckListItem]);
      });
  }

  updateCheckItem(completedAt, checklistItemId) {
    const data = {
      checklistItemId,
      completedAt,
    };

    console.log(data);

    this.http.post<{ message: string }>(BACKEND_URL + 'update-item', data)
      .subscribe((response) => {
        console.log(response);
        const index = this.userCheckListItem.findIndex(el => el._id === checklistItemId);
        if (index !== -1) {
          this.userCheckListItem[index].completedAt = completedAt;
        }
        this.userCheckListItemUpdated.next([...this.userCheckListItem]);
      });
  }


}
