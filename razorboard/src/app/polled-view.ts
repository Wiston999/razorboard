import { OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, timer, interval, merge } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { ApiResponse } from './models/apiresponse.model';
import { RazorapiService } from './razorapi.service';

export abstract class PolledView implements OnInit, OnDestroy {
  private itemsSubscription;
  private timerSubscription;
  private readonly autoRefresh$ = interval(5000).pipe(
    startWith(0)
  );

  private readonly refreshToken$ = new BehaviorSubject(undefined);
  private readonly item$ = merge(
    this.autoRefresh$,
    this.refreshToken$,
  ).pipe(
    switchMap(() => this.getData()),
  );

  constructor(
    protected razorApi: RazorapiService,
    protected toastr: ToastrService,
  ) { }

  abstract getData();
  abstract processData(response);

  ngOnInit() {
    this.itemsSubscription = this.item$.subscribe(response => this.processData(response));
    this.refreshToken$.next(undefined);
  }

  asyncRefresh() {
    this.refreshToken$.next(undefined);
  }

  ngOnDestroy() {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }
}
