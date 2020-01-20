import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPatronEditorComponent } from './media-patron-editor.component';

describe('MediaPatronEditorComponent', () => {
  let component: MediaPatronEditorComponent;
  let fixture: ComponentFixture<MediaPatronEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaPatronEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPatronEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
