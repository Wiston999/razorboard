import { Component, OnInit } from '@angular/core';

import { TablePolledComponent } from '../table-polled/table-polled.component';
import { HookListItemComponent } from './hook-list-item/hook-list-item.component';

import { ComponentFactoryResolver } from '@angular/core';
import { RazorapiService } from '../razorapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpEventsService } from '../http-events.service';

@Component({
  selector: 'app-hooks-list',
  templateUrl: '../table-polled/table-polled.component.html',
  styleUrls: [
    '../table-polled/table-polled.component.css',
    './hooks-list.component.css',
  ]
})
export class HooksListComponent extends TablePolledComponent implements OnInit {

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

  name = 'hooks';
  rowComponent = HookListItemComponent;
  sortField = 'name';
  tableHeaders =  [
    { label: 'name', name: 'name', sort: true },
    { label: 'Type', name: 'hook_type', sort: true },
    { label: 'Actions', name: 'actions', sort: false },
  ];

  pluralMapping = {
    '=1': '1 hook',
    other: '# hooks',
  };

  getData = () => this.razorApi.getHooks();

  filterItem(hook: any, filter: string): boolean {
    filter = filter.toLowerCase();
    if (hook.name.toLowerCase().includes(filter)) {
      return true;
    }
    if (hook.hook_type && hook.hook_type.toLowerCase().includes(filter)) {
      return true;
    }
    return false;
  }
}
