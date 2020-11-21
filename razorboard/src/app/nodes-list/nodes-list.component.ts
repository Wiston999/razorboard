import { Component, OnInit } from '@angular/core';

import { Node } from '../models/node.model';

import { TablePolledComponent } from '../table-polled/table-polled.component';
import { NodeListItemComponent } from './node-list-item/node-list-item.component';

import { ComponentFactoryResolver } from '@angular/core';
import { RazorapiService } from '../razorapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpEventsService } from '../http-events.service';

@Component({
  selector: 'app-nodes-list',
  templateUrl: '../table-polled/table-polled.component.html',
  styleUrls: [
    '../table-polled/table-polled.component.css',
    './nodes-list.component.css',
  ]
})
export class NodesListComponent extends TablePolledComponent implements OnInit {

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

  name = 'nodes';
  rowComponent = NodeListItemComponent;
  sortField = 'name';
  tableHeaders =  [
    { label: 'Name', name: 'name', sort: true },
    { label: 'MAC', name: 'dhcp_mac', sort: true },
    { label: 'Hostname', name: 'facts.hostname', sort: true },
    { label: 'Tags', name: 'tags', sort: false },
    { label: 'Facts', name: 'facts', sort: false },
    { label: 'Metadata', name: 'metadata', sort: false },
    { label: 'State', name: 'policy', sort: false },
    { label: 'Last seen', name: 'last_checkin', sort: true },
    { label: 'Actions', name: 'actions', sort: false },
  ];

  pluralMapping = {
    '=1': '1 node',
    other: '# nodes',
  };

  getData = () => this.razorApi.getNodes();

  compareItems(node1: Node, node2: Node, field: string, reverse: boolean): number {
    if (field !== 'name') {
      return super.compareItems(node1 as any, node2 as any, field, reverse);
    } else {
      const expr = /node(\d+)/;
      const node1Number = node1.name.match(/node(\d+)/);
      const node2Number = node2.name.match(/node(\d+)/);
      return (+node1Number[1] > +node2Number[1] ? 1 : -1) * (reverse ? -1 : 1);
    }
  }

  filterItem(node: any, filter: string): boolean {
    if (node.name.includes(filter)) {
      return true;
    }
    if (node.dhcp_mac.includes(filter) || node.dhcp_mac.replace(/-/g, ':').includes(filter)) {
      return true;
    }
    if (node.facts.hostname && node.facts.hostname.includes(filter)) {
      return true;
    }
    if (node.policy && node.policy.name.includes(filter)) {
      return true;
    }
    for (const tag of node.tags) {
      if (tag.name.includes(filter)) {
        return true;
      }
    }
    return false;
  }
}
