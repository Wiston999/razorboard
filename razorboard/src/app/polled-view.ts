import { OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, timer, interval, merge } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
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
      switchMap(() => this.getData()),
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
