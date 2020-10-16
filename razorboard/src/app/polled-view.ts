import { OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ApiResponse } from './models/apiresponse.model';
import { RazorapiService } from './razorapi.service';

export abstract class PolledView implements OnInit {
  private itemsSubscription;
  private timerSubscription;

  constructor(
    protected razorApi: RazorapiService,
    protected toastr: ToastrService,
  ) { }

  abstract getData();
  abstract processData(response);

  ngOnInit() {
    this.refreshData();
  }

  asyncRefresh() {
    this.refreshData(false);
  }

  refreshData(subscribe: boolean = true) {
    this.itemsSubscription = this.getData().subscribe(
      response => {
        this.processData(response);
        if (subscribe) {
          this.subscribeToData();
        }
      },
      err => {
        this.toastr.error(err.message, 'Request failed', {
          timeOut: this.razorApi.getRefresh() * 500,
          progressBar: true
        });
        if (subscribe) {
          this.subscribeToData();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private subscribeToData(): void {
    this.timerSubscription = timer(this.razorApi.getRefresh() * 1000).subscribe(() => this.refreshData());
  }
}
