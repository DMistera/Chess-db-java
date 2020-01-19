import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorEditorComponent } from './sponsor-editor.component';

describe('SponsorEditorComponent', () => {
  let component: SponsorEditorComponent;
  let fixture: ComponentFixture<SponsorEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
