import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDashboardComponent } from './trip-dashboard.component';

describe('TripDashboardComponent', () => {
  let component: TripDashboardComponent;
  let fixture: ComponentFixture<TripDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
