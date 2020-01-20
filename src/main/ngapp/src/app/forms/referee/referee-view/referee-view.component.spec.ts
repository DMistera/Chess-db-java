import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereeViewComponent } from './referee-view.component';

describe('RefereeViewComponent', () => {
  let component: RefereeViewComponent;
  let fixture: ComponentFixture<RefereeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefereeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefereeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
