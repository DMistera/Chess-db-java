import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereeEditorComponent } from './referee-editor.component';

describe('RefereeEditorComponent', () => {
  let component: RefereeEditorComponent;
  let fixture: ComponentFixture<RefereeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefereeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefereeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
