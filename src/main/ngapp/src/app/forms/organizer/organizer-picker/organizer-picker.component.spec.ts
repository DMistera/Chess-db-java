import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerPickerComponent } from './organizer-picker.component';

describe('OrganizerPickerComponent', () => {
  let component: OrganizerPickerComponent;
  let fixture: ComponentFixture<OrganizerPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizerPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
