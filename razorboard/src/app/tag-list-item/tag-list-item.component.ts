import { Component, OnInit, Input } from '@angular/core';
import { ColorTagService } from '../color-tag.service';

@Component({
  selector: '[tag-list-item]',
  templateUrl: './tag-list-item.component.html',
  styleUrls: ['./tag-list-item.component.css']
})
export class TagListItemComponent implements OnInit {
  @Input() tag;
  @Input() columns: string[];

  constructor(
    public colorTag: ColorTagService,
  ) { }

  ngOnInit() {
  }

}
