import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RowComponent } from '../../table-polled/table-polled.component';

@Component({
  selector: '[configuration-list-item]',
  templateUrl: './configuration-list-item.component.html',
  styleUrls: ['./configuration-list-item.component.css']
})
export class ConfigurationListItemComponent implements OnInit, RowComponent {
  @Input() data;
  @Output() filter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
