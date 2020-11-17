import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpEventsService {

  constructor() { }
  loading = new Subject<boolean>();
  status$ = new Subject<number>();

  show() {
    this.loading.next(true);
  }
  hide() {
    this.loading.next(false);
  }
  statusNotify(value: number) {
    this.status$.next(value);
  }
}
