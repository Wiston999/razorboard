export class LocalStorageStub {
  private store = {};

  get(key: string): string {
    return key in this.store ? this.store[key] : null;
  }
  set(key: string, value: string) {
    this.store[key] = `${value}`;
  }
  has(key: string) {
    return key in this.store;
  }
  remove(key: string) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }
}
