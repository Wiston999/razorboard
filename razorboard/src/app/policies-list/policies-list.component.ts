import { Component, OnInit } from '@angular/core';

import { TablePolledComponent } from '../table-polled/table-polled.component';
import { PolicyListItemComponent } from './policy-list-item/policy-list-item.component';

import { ComponentFactoryResolver } from '@angular/core';
import { RazorapiService } from '../razorapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpEventsService } from '../http-events.service';

@Component({
  selector: 'app-policies-list',
  templateUrl: '../table-polled/table-polled.component.html',
  styleUrls: [
    '../table-polled/table-polled.component.css',
    './policies-list.component.css',
  ]
})
export class PoliciesListComponent extends TablePolledComponent implements OnInit {

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

  name = 'policies';
  rowComponent = PolicyListItemComponent;
  sortField = 'name';
  tableHeaders =  [
    { label: 'name', name: 'name', sort: true },
    { label: 'Repository', name: 'repo.name', sort: true },
    { label: 'Broker', name: 'broker.name', sort: true },
    { label: 'Task', name: 'task.name', sort: true },
    { label: 'Tags', name: 'tags', sort: false },
    { label: 'Enabled?', name: 'enabled', sort: true },
    { label: '% Nodes', name: 'nodes', sort: false },
  ];

  pluralMapping = {
    '=1': '1 policy',
    other: '# policies',
  };

  getData = () => this.razorApi.getPolicies();

  filterItem(policy: any, filter: string): boolean {
    if (policy.name.includes(filter)) {
      return true;
    }
    if (policy.repo && policy.repo.name.includes(filter)) {
      return true;
    }
    if (policy.broker && policy.broker.name.includes(filter)) {
      return true;
    }
    if (policy.task && policy.task.name.includes(filter)) {
      return true;
    }
    for (const tag of policy.tags) {
      if (tag.name.includes(filter)) {
        return true;
      }
    }
    return false;
  }
}
