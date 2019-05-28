import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeaderLocationsComponent } from './sub-header-locations.component';

describe('SubHeaderLocationsComponent', () => {
  let component: SubHeaderLocationsComponent;
  let fixture: ComponentFixture<SubHeaderLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubHeaderLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHeaderLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
