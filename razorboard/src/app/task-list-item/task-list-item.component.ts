import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[task-list-item]',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css']
})
export class TaskListItemComponent implements OnInit {
  @Input() task;
  @Input() columns: string[];
  @Output() filter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onFilter(value: string) {
    this.filter.emit(value);
  }
}
