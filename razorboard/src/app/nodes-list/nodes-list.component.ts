import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RazorapiService } from '../razorapi.service';

import { Node } from '../models/node.model';

import { TablePolledComponent } from '../table-polled/table-polled.component';
import { NodeListItemComponent } from './node-list-item.component';

export class NodesListComponent extends TablePolledComponent implements OnInit {

  name = 'nodes';
  rowComponent = NodeListItemComponent;
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

  compareItems(a: Node, b: Node): number {
    const expr = /node(\d+)/;
    const node1Number = a.name.match(/node(\d+)/);
    const node2Number = b.name.match(/node(\d+)/);
    return +node1Number[1] > +node2Number[1] ? 1 : -1;
  }

  filterItem(item: any, filter: string): boolean {

    return true;
  }
}
