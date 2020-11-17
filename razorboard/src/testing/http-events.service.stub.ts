export class HttpEventsServiceStub {
  calls = [];

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

