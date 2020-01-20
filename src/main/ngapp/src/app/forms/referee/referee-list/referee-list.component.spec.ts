import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereeListComponent } from './referee-list.component';

describe('RefereeListComponent', () => {
  let component: RefereeListComponent;
  let fixture: ComponentFixture<RefereeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefereeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefereeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
