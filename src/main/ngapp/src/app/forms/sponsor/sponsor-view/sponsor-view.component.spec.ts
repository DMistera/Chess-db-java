import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorViewComponent } from './sponsor-view.component';

describe('SponsorViewComponent', () => {
  let component: SponsorViewComponent;
  let fixture: ComponentFixture<SponsorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
