import { Component, OnInit } from '@angular/core';

import { TablePolledComponent } from '../table-polled/table-polled.component';
import { TagListItemComponent } from './tag-list-item/tag-list-item.component';

import { ComponentFactoryResolver } from '@angular/core';
import { RazorapiService } from '../razorapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpEventsService } from '../http-events.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: '../table-polled/table-polled.component.html',
  styleUrls: [
    '../table-polled/table-polled.component.css',
    './tags-list.component.css',
  ]
})
export class TagsListComponent extends TablePolledComponent implements OnInit {

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

  name = 'tags';
  rowComponent = TagListItemComponent;
  sortField = 'name';
  tableHeaders =  [
    { label: 'name', name: 'name', sort: true },
    { label: 'Nodes', name: 'nodes.count', sort: true },
    { label: 'Policies', name: 'policies.count', sort: true },
    { label: 'Rule', name: 'rule', sort: false },
  ];

  pluralMapping = {
    '=1': '1 tag',
    other: '# tags',
  };

  getData = () => this.razorApi.getTags();

  filterItem(tag: any, filter: string): boolean {
    if (tag.name.includes(filter)) {
      return true;
    }
    if (JSON.stringify(tag.rule).includes(filter)) {
      return true;
    }
    return false;
  }
}
