import { OnInit, OnDestroy, Component, ComponentFactoryResolver, isDevMode } from '@angular/core';
import { EMPTY, BehaviorSubject, Subject, timer, interval, merge } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ApiResponse } from './models/apiresponse.model';
import { RazorapiService } from './razorapi.service';
import { HttpEventsService } from './http-events.service';

@Component({
  selector: 'app-polled-view',
  template: '',
})
export abstract class PolledViewComponent implements OnInit, OnDestroy {
  private itemsSubscription;

  private readonly refresh$ = new BehaviorSubject(undefined);
  httpLoading: Subject<boolean>;
  devMode = isDevMode();

  constructor(
    public razorApi: RazorapiService,
    public route: ActivatedRoute,
    public router: Router,
    public title: Title,
    public cfResolver: ComponentFactoryResolver,
    public httpEventsService: HttpEventsService,
  ) {
  }

  abstract getData();
  abstract processData(response);

  ngOnInit() {
    console.log('polled-view', this.route);
    console.log('polled-view', this.router);
    console.log('polled-view', this.httpEventsService);
    this.httpLoading = this.httpEventsService.loading;
    this.itemsSubscription = merge(
      this.razorApi.reload$,
      this.refresh$,
    ).pipe(
      switchMap(() => this.getData().pipe(
        // This inner pipe avoids the observable to be completed when an HTTP error arises
        catchError((err, caugth) => {
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
      replaceUrl: true,
    });
  }
}
