import { TestBed } from '@angular/core/testing';

import { RazorapiService } from './razorapi.service';

describe('RazorapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RazorapiService = TestBed.get(RazorapiService);
    expect(service).toBeTruthy();
  });
});
