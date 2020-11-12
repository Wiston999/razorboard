export class HttpLoadingServiceStub {
  calls = [];

  constructor() { }
  show() {
    this.calls.push('show');
  }
  hide() {
    this.calls.push('hide');
  }
}

