import { Subject } from 'rxjs';

export class HttpEventsServiceStub {
  calls = [];

  status$ = new Subject<number>();

  constructor() { }
  show() {
    this.calls.push('show');
  }
  hide() {
    this.calls.push('hide');
  }
  statusNotify(value: number) {
    this.calls.push(`statusNotify: ${value}`);
  }
}

