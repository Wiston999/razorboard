import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RowComponent } from '../../table-polled/table-polled.component';

@Component({
  selector: '[broker-list-item]',
  templateUrl: './broker-list-item.component.html',
  styleUrls: ['./broker-list-item.component.css']
})
export class BrokerListItemComponent implements OnInit, RowComponent {
  @Input() data;
  @Output() filter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
