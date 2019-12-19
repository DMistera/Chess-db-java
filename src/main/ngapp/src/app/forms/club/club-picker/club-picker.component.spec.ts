import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubPickerComponent } from './club-picker.component';

describe('ClubPickerComponent', () => {
  let component: ClubPickerComponent;
  let fixture: ComponentFixture<ClubPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
