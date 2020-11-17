import { TestBed } from '@angular/core/testing';

import { HttpEventsService } from './http-events.service';

describe('HttpEventsService', () => {
  let service: HttpEventsService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(HttpEventsService);
    spyOn(service.loading, 'next');
    spyOn(service.status$, 'next');
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
  it('should notify status', () => {
    service.statusNotify(0);
    expect(service.status$.next).toHaveBeenCalledWith(0);

    service.statusNotify(401);
    expect(service.status$.next).toHaveBeenCalledWith(401);
  });
});
