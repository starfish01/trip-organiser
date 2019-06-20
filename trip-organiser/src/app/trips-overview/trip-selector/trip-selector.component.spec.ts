import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripSelectorComponent } from './trip-selector.component';

describe('TripSelectorComponent', () => {
  let component: TripSelectorComponent;
  let fixture: ComponentFixture<TripSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
