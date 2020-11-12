import { TestBed } from '@angular/core/testing';

import { HttpLoadingService } from './http-loading.service';

describe('HttpLoadingService', () => {
  let service: HttpLoadingService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(HttpLoadingService);
    spyOn(service.loading, 'next');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show', () => {
    service.show();
    expect(service.loading.next).toHaveBeenCalledWith(true);
  });

  it('should hide', () => {
    service.hide();
    expect(service.loading.next).toHaveBeenCalledWith(false);
  });
});
