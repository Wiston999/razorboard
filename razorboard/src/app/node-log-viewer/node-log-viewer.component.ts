import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { PolledView } from '../polled-view';
import { RazorapiService } from '../razorapi.service';
import { HttpEventsService } from '../http-events.service';

import { NodeLog } from '../models/node-log.model';

@Component({
  selector: 'app-node-log-viewer',
  templateUrl: './node-log-viewer.component.html',
  styleUrls: ['./node-log-viewer.component.css']
})
export class NodeLogViewerComponent extends PolledView implements OnInit {
  private responseItems: any[];
  private titlePrefix = 'Node Logs';
  nodeId: string;
  entries: NodeLog[];
  devMode = false;
  sortReverse = true;
  sortField = 'timestamp';
  filter = '';
  total = 0;
  filterTotal = 0;

  httpLoading: Subject<boolean> = this.httpEventsService.loading;

  headers = [ 'Time', 'Severity', 'Event', 'Message' ];
  pluralMapping = {
    '=1': '1 entry',
    other: '# entries',
  };

  constructor(
    protected razorApi: RazorapiService,
    protected route: ActivatedRoute,
    protected router: Router,
    private httpEventsService: HttpEventsService,
    private titleService: Title,
  ) {
    super(razorApi, route, router);
    this.devMode = isDevMode();
  }

  ngOnInit() {
    this.nodeId = this.route.snapshot.paramMap.get('id');
    this.filter = this.route.snapshot.queryParams.search;
    this.setTitle();

    super.ngOnInit();
  }

  setTitle() {
    const title = [this.titlePrefix, this.nodeId];
    if (this.filter) {
      title.push(`Search: ${this.filter}`);
    }
    this.titleService.setTitle(title.join(' - '));
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
      item => !this.filter || this.filterItem(item, this.filter)
    );
    this.filterTotal = this.entries.length;
    this.setUrlSearch(this.filter);
    this.setTitle();
  }

  filterItem(item, filter: string): boolean {
    if (item.msg && item.msg.toLowerCase().includes(filter.toLowerCase())) {
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
