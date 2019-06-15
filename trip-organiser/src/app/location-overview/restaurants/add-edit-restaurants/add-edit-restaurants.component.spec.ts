import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRestaurantsComponent } from './add-edit-restaurants.component';

describe('AddEditRestaurantsComponent', () => {
  let component: AddEditRestaurantsComponent;
  let fixture: ComponentFixture<AddEditRestaurantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditRestaurantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
