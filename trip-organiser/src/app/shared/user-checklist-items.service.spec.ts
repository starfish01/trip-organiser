import { TestBed } from '@angular/core/testing';

import { UserChecklistItemsService } from './user-checklist-items.service';

describe('UserChecklistItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserChecklistItemsService = TestBed.get(UserChecklistItemsService);
    expect(service).toBeTruthy();
  });
});
