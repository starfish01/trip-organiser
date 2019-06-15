import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsOverviewComponent } from './trips-overview.component';

describe('TripsOverviewComponent', () => {
  let component: TripsOverviewComponent;
  let fixture: ComponentFixture<TripsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
