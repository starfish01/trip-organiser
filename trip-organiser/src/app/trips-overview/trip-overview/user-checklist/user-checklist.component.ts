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


  checkList: UserCheckListItem[] = [];
  private attendeeListSub: Subscription;

  constructor(private userCheckListService: UserChecklistItemsService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.attendeeListSub = this.userCheckListService.userCheckListItemUpdatedListener().subscribe((data) => {
      this.checkList = data;
      this.isLoading = false;
    });
    this.userCheckListService.getChecklistItems(this.tripId);
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
    this.userCheckListService.removeCheckListItem(checklistItemId);
  }

  ngOnDestroy(): void {
    this.attendeeListSub.unsubscribe();
  }

}
