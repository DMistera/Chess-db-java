import { TestBed } from '@angular/core/testing';

import { RefereeService } from './referee.service';

describe('RefereeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefereeService = TestBed.get(RefereeService);
    expect(service).toBeTruthy();
  });
});
