import { Component, OnInit } from '@angular/core';

import { TablePolledComponent } from '../table-polled/table-polled.component';
import { RepoListItemComponent } from './repo-list-item/repo-list-item.component';

import { ComponentFactoryResolver } from '@angular/core';
import { RazorapiService } from '../razorapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpEventsService } from '../http-events.service';

@Component({
  selector: 'app-repos-list',
  templateUrl: '../table-polled/table-polled.component.html',
  styleUrls: [
    '../table-polled/table-polled.component.css',
    './repos-list.component.css',
  ]
})
export class ReposListComponent extends TablePolledComponent implements OnInit {

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

  name = 'brokers';
  rowComponent = RepoListItemComponent;
  sortField = 'name';
  tableHeaders =  [
    { label: 'name', name: 'name', sort: true },
    { label: 'URL', name: 'url', sort: false },
    { label: 'Default Task', name: 'task', sort: false },
  ];

  pluralMapping = {
    '=1': '1 repository',
    other: '# repositories',
  };

  getData = () => this.razorApi.getRepos();

  filterItem(repo: any, filter: string): boolean {
    if (repo.name.includes(filter)) {
      return true;
    }
    if (repo.url && repo.url.includes(filter)) {
      return true;
    }
    if (repo.iso_url && repo.iso_url.includes(filter)) {
      return true;
    }
    if (repo.task && repo.task.name.includes(filter)) {
      return true;
    }
    return false;
  }
}
