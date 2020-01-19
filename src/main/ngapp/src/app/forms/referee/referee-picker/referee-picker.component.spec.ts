import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereePickerComponent } from './referee-picker.component';

describe('RefereePickerComponent', () => {
  let component: RefereePickerComponent;
  let fixture: ComponentFixture<RefereePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefereePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefereePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
