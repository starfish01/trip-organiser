import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChecklistComponent } from './user-checklist.component';

describe('UserChecklistComponent', () => {
  let component: UserChecklistComponent;
  let fixture: ComponentFixture<UserChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
