import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpEventsService } from './http-events.service';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { RazorapiService } from './razorapi.service';

import { HttpEventsServiceStub } from '../testing/http-events.service.stub';

const httpErrors = [
  0,
  400, 401, 402, 403, 404,
  500, 501, 502, 503, 504,
];

describe(`HttpErrorInterceptor`, () => {
  let httpMock: HttpTestingController;
  let toastr: ToastrService;
  let httpEventsStub: HttpEventsServiceStub;
  let razorApi: RazorapiService;

  beforeEach(() => {
    httpEventsStub = new HttpEventsServiceStub();
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        RazorapiService,
        ToastrService,
        { provide: HttpEventsService, useValue: httpEventsStub },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true,
        },
      ],
    });

    toastr = TestBed.get(ToastrService);
    httpMock = TestBed.get(HttpTestingController);
    razorApi = TestBed.get(RazorapiService);
    spyOn(toastr, 'error');
    spyOn(console, 'error');
  });

  httpErrors.forEach((errCode, i) => {
    it(`should manage HTTP error status on ${errCode}`, fakeAsync(() => {
      spyOn(httpEventsStub, 'statusNotify');
      // Ignore response and error
      razorApi.getNodes().subscribe(
        r => {},
        err => {},
      );
      // Get previous request
      const httpRequest = httpMock.match((req) => true)[0];
      httpRequest.flush(null, {status: errCode, statusText: 'Whatever'});
      tick();

      expect(toastr.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledTimes(1);

      expect(httpEventsStub.statusNotify).toHaveBeenCalledWith(errCode);
      expect(httpEventsStub.statusNotify).toHaveBeenCalledTimes(1);
    }));
  });

  afterAll(() => {
    httpMock.verify();
  });
});
