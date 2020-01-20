import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPatronViewComponent } from './media-patron-view.component';

describe('MediaPatronViewComponent', () => {
  let component: MediaPatronViewComponent;
  let fixture: ComponentFixture<MediaPatronViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaPatronViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPatronViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
