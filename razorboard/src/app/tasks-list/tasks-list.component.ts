import { Component, OnInit } from '@angular/core';

import { TablePolledComponent } from '../table-polled/table-polled.component';
import { TaskListItemComponent } from './task-list-item/task-list-item.component';

@Component({
  selector: 'app-brokers-list',
  templateUrl: '../table-polled/table-polled.component.html',
  styleUrls: [
    '../table-polled/table-polled.component.css',
    './tasks-list.component.css',
  ]
})
export class TasksListComponent extends TablePolledComponent implements OnInit {

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
    if (task.name.includes(filter)) {
      return true;
    }
    if (task.base && task.base.name.includes(filter)) {
      return true;
    }
    if (task.description.includes(filter)) {
      return true;
    }
    return false;
  }
}
