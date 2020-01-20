import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPatronListComponent } from './media-patron-list.component';

describe('MediaPatronListComponent', () => {
  let component: MediaPatronListComponent;
  let fixture: ComponentFixture<MediaPatronListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaPatronListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPatronListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
