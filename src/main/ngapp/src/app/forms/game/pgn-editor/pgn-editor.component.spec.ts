import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgnEditorComponent } from './pgn-editor.component';

describe('PgnEditorComponent', () => {
  let component: PgnEditorComponent;
  let fixture: ComponentFixture<PgnEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgnEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgnEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
