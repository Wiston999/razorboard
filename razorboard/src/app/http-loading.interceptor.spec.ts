import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RazorapiService } from './razorapi.service';
import { HttpLoadingService } from './http-loading.service';
import { HttpLoadingInterceptor } from './http-loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpLoadingServiceStub } from '../testing/http-loading.service.stub';

describe(`HttpLoadingInterceptor`, () => {
  let service: RazorapiService;
  let httpMock: HttpTestingController;
  const httpLoadingStub = new HttpLoadingServiceStub();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RazorapiService,
        { provide: HttpLoadingService, useValue: httpLoadingStub },
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

  it('should manage loading service', fakeAsync(() => {
    service.getNodes().subscribe(response => { }).unsubscribe();
    tick();
    expect(httpLoadingStub.calls).toEqual(['show', 'hide']);
  }));
});
