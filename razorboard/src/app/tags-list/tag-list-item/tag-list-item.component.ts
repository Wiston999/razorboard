import { ViewEncapsulation, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColorTagService } from '../../color-tag.service';

import { RowComponent } from '../../table-polled/table-polled.component';

@Component({
  selector: '[tag-list-item]',
  templateUrl: './tag-list-item.component.html',
  styleUrls: ['./tag-list-item.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TagListItemComponent implements OnInit, RowComponent {
  @Input() data;
  @Output() filter = new EventEmitter<string>();

  constructor(
    public colorTag: ColorTagService,
  ) { }

  ngOnInit() {
  }

}
