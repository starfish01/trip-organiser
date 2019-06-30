import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Attendee} from '../../../model/attendee';
import {Subscription} from 'rxjs';
import {UserCheckListItem} from '../../../model/user-check-list-item.model';
import {UsersInformationService} from '../../../shared/users-information.service';
import {UserChecklistItemsService} from '../../../shared/user-checklist-items.service';

@Component({
  selector: 'app-user-checklist',
  templateUrl: './user-checklist.component.html',
  styleUrls: ['./user-checklist.component.scss']
})

export class UserChecklistComponent implements OnInit, OnDestroy {

  @Input('tripId') tripId: string;

  isLoading: boolean;
  isAddingItem: boolean;
  isLoadingRemovingID: string;


  checkList: UserCheckListItem[] = [];
  private attendeeListSub: Subscription;

  constructor(private userCheckListService: UserChecklistItemsService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.attendeeListSub = this.userCheckListService.userCheckListItemUpdatedListener().subscribe((data: UserCheckListItem[]) => {
      this.checkList = this.sortChecklist(data);
      this.isLoading = false;
      this.isLoadingRemovingID = null;
    });
    this.userCheckListService.getChecklistItems(this.tripId);
  }

  sortChecklist(data) {

    const unchecked: UserCheckListItem[] = [];
    const checked: UserCheckListItem[] = [];

    data.forEach((el: UserCheckListItem) => {
      if (el.completedAt == null) {
        unchecked.push(el);
      } else {
        checked.push(el);
      }
    });

    unchecked.sort((a, b) => (a.completedAt > b.completedAt) ? 1 : ((b.completedAt > a.completedAt) ? -1 : 0));
    checked.sort((a, b) => (a.completedAt > b.completedAt) ? 1 : ((b.completedAt > a.completedAt) ? -1 : 0));

    console.log(unchecked);
    console.log(checked);


    return [...unchecked, ...checked];
  }


  onAddCheckListItem(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isAddingItem = false;
    this.isLoading = true;

    const data = {
      description: form.value.checklistItem,
      tripId: this.tripId,
    };

    this.userCheckListService.addCheckListItem(data);

  }

  onAddCheckListItemButton() {
    this.isAddingItem = !this.isAddingItem;
  }

  onRemoveItem(checklistItemId) {
    this.isLoadingRemovingID = checklistItemId;
    this.userCheckListService.removeCheckListItem(checklistItemId);
  }

  onCheckItem(checklistItemId, completedAt) {

    if (completedAt != null) {
      completedAt = null;
    } else {
      completedAt = new Date().getTime() / 1000 | 0;
    }

    this.userCheckListService.updateCheckItem(completedAt, checklistItemId);


  }

  ngOnDestroy(): void {
    this.attendeeListSub.unsubscribe();
  }

}
