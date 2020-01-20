import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorPickerComponent } from './sponsor-picker.component';

describe('SponsorPickerComponent', () => {
  let component: SponsorPickerComponent;
  let fixture: ComponentFixture<SponsorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
