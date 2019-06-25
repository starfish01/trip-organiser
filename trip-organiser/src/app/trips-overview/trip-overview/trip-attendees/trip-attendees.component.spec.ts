import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripAttendeesComponent } from './trip-attendees.component';

describe('TripAttendeesComponent', () => {
  let component: TripAttendeesComponent;
  let fixture: ComponentFixture<TripAttendeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripAttendeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripAttendeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
