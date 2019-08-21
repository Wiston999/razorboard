import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpLoadingService {

  constructor() { }
  loading = new Subject<boolean>();
  show() {
    this.loading.next(true);
  }
  hide() {
    this.loading.next(false);
  }
}
