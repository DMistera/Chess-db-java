import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentPickerComponent } from './tournament-picker.component';

describe('TournamentPickerComponent', () => {
  let component: TournamentPickerComponent;
  let fixture: ComponentFixture<TournamentPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
