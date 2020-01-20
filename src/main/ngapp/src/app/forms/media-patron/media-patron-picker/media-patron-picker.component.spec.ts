import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPatronPickerComponent } from './media-patron-picker.component';

describe('MediaPatronPickerComponent', () => {
  let component: MediaPatronPickerComponent;
  let fixture: ComponentFixture<MediaPatronPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaPatronPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPatronPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
