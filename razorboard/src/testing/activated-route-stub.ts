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
  private subject = new ReplaySubject<ParamMap>();

  /** The mock paramMap observable */
  paramMap = this.subject.asObservable();

  get snapshot(): ActivatedRouteSnapshot {
    const snapshot: Partial<ActivatedRouteSnapshot> = {
      paramMap: this.$paramMap,
    };

    return snapshot as ActivatedRouteSnapshot;
  }

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  /** Set the paramMap observables's next value */
  setParamMap(params?: Params) {
    const paramMap = convertToParamMap(params);
    this.$paramMap = paramMap;
    this.subject.next(paramMap);
  }
}
