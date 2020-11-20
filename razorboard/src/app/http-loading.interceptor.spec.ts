import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RazorapiService } from './razorapi.service';
import { HttpEventsService } from './http-events.service';
import { HttpLoadingInterceptor } from './http-loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpEventsServiceStub } from '../testing/http-events.service.stub';

describe(`HttpLoadingInterceptor`, () => {
  let service: RazorapiService;
  let httpMock: HttpTestingController;
  const httpEventsStub = new HttpEventsServiceStub();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RazorapiService,
        { provide: HttpEventsService, useValue: httpEventsStub },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpLoadingInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.get(RazorapiService);
    httpMock = TestBed.get(HttpTestingController);
    service.connect('http://localhost:8150', '', '', 0, false);
  });

  it('should manage loading status', fakeAsync(() => {
    service.getNodes().subscribe(response => { }).unsubscribe();
    tick();
    expect(httpEventsStub.calls).toEqual(['show', 'hide']);
  }));
});
