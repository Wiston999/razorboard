import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RowComponent } from '../../table-polled/table-polled.component';

@Component({
  selector: '[repo-list-item]',
  templateUrl: './repo-list-item.component.html',
  styleUrls: ['./repo-list-item.component.css']
})
export class RepoListItemComponent implements OnInit {
  @Input() data;
  @Output() filter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
