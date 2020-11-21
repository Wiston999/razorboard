import { Component, OnInit } from '@angular/core';

import { TablePolledComponent } from '../table-polled/table-polled.component';
import { TaskListItemComponent } from './task-list-item/task-list-item.component';

import { ComponentFactoryResolver } from '@angular/core';
import { RazorapiService } from '../razorapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpEventsService } from '../http-events.service';

@Component({
  selector: 'app-brokers-list',
  templateUrl: '../table-polled/table-polled.component.html',
  styleUrls: [
    '../table-polled/table-polled.component.css',
    './tasks-list.component.css',
  ]
})
export class TasksListComponent extends TablePolledComponent implements OnInit {

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

  name = 'tasks';
  rowComponent = TaskListItemComponent;
  sortField = 'name';
  tableHeaders =  [
    { label: 'name', name: 'name', sort: true },
    { label: 'Version', name: 'version', sort: false },
    { label: 'Base Task', name: 'task.name', sort: true },
    { label: 'Boot Sequence', name: 'boot_sequence', sort: false },
    { label: 'Description', name: 'description', sort: false },
  ];

  pluralMapping = {
    '=1': '1 task',
    other: '# tasks',
  };

  getData = () => this.razorApi.getTasks();

  filterItem(task: any, filter: string): boolean {
    filter = filter.toLowerCase();
    if (task.name.toLowerCase().includes(filter)) {
      return true;
    }
    if (task.base && task.base.name.toLowerCase().includes(filter)) {
      return true;
    }
    if (task.description.toLowerCase().includes(filter)) {
      return true;
    }
    return false;
  }
}
