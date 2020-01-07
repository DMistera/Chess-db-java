import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubViewComponent } from './club-view.component';

describe('ClubViewComponent', () => {
  let component: ClubViewComponent;
  let fixture: ComponentFixture<ClubViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
