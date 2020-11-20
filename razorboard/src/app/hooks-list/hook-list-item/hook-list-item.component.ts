import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RowComponent } from '../../table-polled/table-polled.component';

@Component({
  selector: '[hook-list-item]',
  templateUrl: './hook-list-item.component.html',
  styleUrls: ['./hook-list-item.component.css']
})
export class HookListItemComponent implements OnInit, RowComponent {
  @Input() data;
  @Output() filter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
