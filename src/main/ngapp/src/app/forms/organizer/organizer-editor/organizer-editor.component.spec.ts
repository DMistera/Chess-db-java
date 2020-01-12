import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerEditorComponent } from './organizer-editor.component';

describe('OrganizerEditorComponent', () => {
  let component: OrganizerEditorComponent;
  let fixture: ComponentFixture<OrganizerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizerEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
