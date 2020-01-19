import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeEditorComponent } from './prize-editor.component';

describe('PrizeEditorComponent', () => {
  let component: PrizeEditorComponent;
  let fixture: ComponentFixture<PrizeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
