import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RowComponent } from '../../table-polled/table-polled.component';

import { ColorTagService } from '../../color-tag.service';

@Component({
  selector: '[policy-list-item]',
  templateUrl: './policy-list-item.component.html',
  styleUrls: ['./policy-list-item.component.css']
})
export class PolicyListItemComponent implements OnInit, RowComponent {
  @Input() data;
  @Output() filter = new EventEmitter<string>();

  constructor(
    public colorTag: ColorTagService,
  ) { }

  ngOnInit() {
  }

  barColor(): string {
    const percentage = this.data.nodes.count / this.data.max_count;
    if (percentage >= 1) {
      return 'danger';
    } else if (percentage >= 0.85) {
      return 'warning';
    }
    return 'info';
  }
}
