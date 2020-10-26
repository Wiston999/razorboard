import { OnInit, OnDestroy } from '@angular/core';
import { EMPTY, BehaviorSubject, timer, interval, merge } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { ApiResponse } from './models/apiresponse.model';
import { RazorapiService } from './razorapi.service';

export abstract class PolledView implements OnInit, OnDestroy {
  private itemsSubscription;

  private readonly refresh$ = new BehaviorSubject(undefined);

  constructor(
    protected razorApi: RazorapiService,
    protected toastr: ToastrService,
  ) { }

  abstract getData();
  abstract processData(response);

  ngOnInit() {
    this.itemsSubscription = merge(
      this.razorApi.reload$,
      this.refresh$,
    ).pipe(
      switchMap(() => this.getData().pipe(
        // This inner pipe avoids the observable to be completed when an HTTP error arises
        catchError((err, caugth) => {
          this.toastr.error(err.message, 'Unable to fetch data');
          return EMPTY;
        }),
      )),
    ).subscribe(
      response => this.processData(response)
    );
  }

  asyncRefresh() {
    this.refresh$.next(undefined);
  }

  ngOnDestroy() {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }
}
