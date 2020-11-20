import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RowComponent } from '../../table-polled/table-polled.component';

@Component({
  selector: '[task-list-item]',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css']
})
export class TaskListItemComponent implements OnInit, RowComponent {
  @Input() data;
  @Output() filter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onFilter(value: string) {
    this.filter.emit(value);
  }
}
