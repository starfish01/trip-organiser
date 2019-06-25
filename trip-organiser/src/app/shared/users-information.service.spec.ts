import { TestBed } from '@angular/core/testing';

import { UsersInformationService } from './users-information.service';

describe('UsersInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersInformationService = TestBed.get(UsersInformationService);
    expect(service).toBeTruthy();
  });
});
