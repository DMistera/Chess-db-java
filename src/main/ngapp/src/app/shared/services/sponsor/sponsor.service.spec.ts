import { TestBed } from '@angular/core/testing';

import { SponsorService } from './sponsor.service';

describe('SponsorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SponsorService = TestBed.get(SponsorService);
    expect(service).toBeTruthy();
  });
});
