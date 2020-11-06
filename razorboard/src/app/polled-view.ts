import { OnInit, OnDestroy } from '@angular/core';
import { EMPTY, BehaviorSubject, timer, interval, merge } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Params, Router, ActivatedRoute } from '@angular/router';

import { ApiResponse } from './models/apiresponse.model';
import { RazorapiService } from './razorapi.service';

export abstract class PolledView implements OnInit, OnDestroy {
  private itemsSubscription;

  private readonly refresh$ = new BehaviorSubject(undefined);

  constructor(
    protected razorApi: RazorapiService,
    protected toastr: ToastrService,
    protected route: ActivatedRoute,
    protected router: Router,
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

  setUrlSearch(search: string) {
    const queryParams: Params = { search };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }
}
