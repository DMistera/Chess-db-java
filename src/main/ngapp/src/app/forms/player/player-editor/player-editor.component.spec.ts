import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerEditorComponent } from './player-editor.component';

describe('PlayerEditorComponent', () => {
  let component: PlayerEditorComponent;
  let fixture: ComponentFixture<PlayerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
