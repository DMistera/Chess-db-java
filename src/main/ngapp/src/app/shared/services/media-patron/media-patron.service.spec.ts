import { TestBed } from '@angular/core/testing';

import { MediaPatronService } from './media-patron.service';

describe('MediaPatronService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaPatronService = TestBed.get(MediaPatronService);
    expect(service).toBeTruthy();
  });
});
