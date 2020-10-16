import { TestBed } from '@angular/core/testing';

import { HttpLoadingService } from './http-loading.service';

describe('HttpLoadingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpLoadingService = TestBed.get(HttpLoadingService);
    expect(service).toBeTruthy();
  });
});
