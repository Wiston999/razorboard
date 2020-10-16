import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';

import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PolledView } from '../polled-view';
import { RazorapiService } from '../razorapi.service';
import { HttpLoadingService } from '../http-loading.service';

import { NodeLog } from '../models/node-log.model';

@Component({
  selector: 'app-node-log-viewer',
  templateUrl: './node-log-viewer.component.html',
  styleUrls: ['./node-log-viewer.component.css']
})
export class NodeLogViewerComponent extends PolledView implements OnInit {
  private responseItems: any[];
  nodeId: string;
  entries: NodeLog[];
  devMode = false;
  sortReverse = true;
  sortField = 'timestamp';
  filter = '';
  total = 0;
  filterTotal = 0;

  httpLoading: Subject<boolean> = this.loaderService.loading;

  headers = [ 'Time', 'Severity', 'Event', 'Message' ];
  pluralMapping = {
    '=1': '1 entry',
    other: '# entries',
  };

  constructor(
    protected razorApi: RazorapiService,
    protected toastr: ToastrService,
    private route: ActivatedRoute,
    private loaderService: HttpLoadingService,
  ) {
    super(razorApi, toastr);
    this.devMode = isDevMode();
  }

  ngOnInit() {
    this.nodeId = this.route.snapshot.paramMap.get('id');
    super.ngOnInit();
  }

  getData() {
    if (!this.nodeId) {
      throw new Error('Node ID is undefined');
    }

    return this.razorApi.getNodeLogs(this.nodeId);
  }

  processData(response) {
    this.total = response.items.length;
    this.responseItems = response.items;
    this.generateItemList();
  }

  generateItemList() {
    this.entries = this.responseItems.filter(
      item => this.filter === undefined || this.filterItem(item, this.filter)
    );
    this.filterTotal = this.entries.length;
  }

  filterItem(item, filter: string): boolean {
    if (item.msg && item.msg.includes(filter)) {
      return true;
    }
    if (item.severity && item.severity.includes(filter.toLowerCase())) {
      return true;
    }
    if (item.event && item.event.includes(filter)) {
      return true;
    }
    if (item.stage && item.stage.includes(filter)) {
      return true;
    }
    if (item.action && item.action.includes(filter)) {
      return true;
    }
    if (item.error && item.error.includes(filter)) {
      return true;
    }
    if (item.repo && item.repo.includes(filter)) {
      return true;
    }
    if (item.script && item.script.includes(filter)) {
      return true;
    }
    if (item.url && item.url.includes(filter)) {
      return true;
    }
    if (item.template && item.template.includes(filter)) {
      return true;
    }
    if (item.policy && item.policy.includes(filter)) {
      return true;
    }

    return false;
  }
}
