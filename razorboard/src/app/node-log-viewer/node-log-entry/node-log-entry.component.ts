import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RowComponent } from '../../table-polled/table-polled.component';

@Component({
  selector: '[node-log-entry]',
  templateUrl: './node-log-entry.component.html',
  styleUrls: ['./node-log-entry.component.css']
})
export class NodeLogEntryComponent implements OnInit, RowComponent {
  @Input() data;
  @Output() filter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
