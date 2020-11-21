import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';

import { Subject } from 'rxjs';

import { TablePolledComponent } from '../table-polled/table-polled.component';
import { NodeLogEntryComponent } from './node-log-entry/node-log-entry.component';

import { ComponentFactoryResolver } from '@angular/core';
import { RazorapiService } from '../razorapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpEventsService } from '../http-events.service';

import { NodeLog } from '../models/node-log.model';

@Component({
  selector: 'app-node-log-viewer',
  templateUrl: '../table-polled/table-polled.component.html',
  styleUrls: [
    '../table-polled/table-polled.component.css',
    './node-log-viewer.component.css',
  ]
})
export class NodeLogViewerComponent extends TablePolledComponent implements OnInit {

  constructor(
    public razorApi: RazorapiService,
    public route: ActivatedRoute,
    public router: Router,
    public title: Title,
    public httpEventsService: HttpEventsService,
    public cfResolver: ComponentFactoryResolver,
  ) {
    super(
      razorApi,
      route,
      router,
      title,
      httpEventsService,
      cfResolver,
    );
  }

  nodeId: string;
  name = 'nodes';
  rowComponent = NodeLogEntryComponent;
  sortReverse = true;
  sortField = 'time';
  pluralMapping: {};
  tableHeaders =  [
    { label: 'Time', name: 'time', sort: true },
    { label: 'Severity', name: 'severity', sort: false },
    { label: 'Event', name: 'event', sort: false },
    { label: 'Message', name: 'message', sort: false },
  ];

  ngOnInit() {
    this.nodeId = this.route.snapshot.paramMap.get('id');
    this.pluralMapping = {
      '=1': `1 log entry for node ${this.nodeId}`,
      other: `# log entries for node ${this.nodeId}`,
    };
    super.ngOnInit();
  }

  getData() {
    if (!this.nodeId) {
      throw new Error('Node ID is undefined');
    }
    return this.razorApi.getNodeLogs(this.nodeId);
  }

  setTitle() {
    const title = ['Node Logs', this.nodeId];
    if (this.filter) {
      title.push(`Search: ${this.filter}`);
    }
    this.title.setTitle(title.join(' - '));
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
