import { ActivatedRouteSnapshot, convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private $paramMap: ParamMap;
  private $queryParam: Params;
  private subject = new ReplaySubject<ParamMap>();
  private qpSubject = new ReplaySubject<Params>();

  /** The mock paramMap observable */
  paramMap = this.subject.asObservable();
  queryParams = this.qpSubject.asObservable();

  get snapshot(): ActivatedRouteSnapshot {
    const snapshot: Partial<ActivatedRouteSnapshot> = {
      paramMap: this.$paramMap,
      queryParams: this.$queryParam,
    };

    return snapshot as ActivatedRouteSnapshot;
  }

  constructor(initialParams?: Params, queryParams?: Params) {
    this.setParamMap(initialParams);
    this.setQueryParams(queryParams);
  }

  /** Set the paramMap observables's next value */
  setParamMap(params?: Params) {
    const paramMap = convertToParamMap(params);
    this.$paramMap = paramMap;
    this.subject.next(paramMap);
  }

  setQueryParams(params?: Params) {
    this.$queryParam = params;
    this.qpSubject.next(params);
  }
}
