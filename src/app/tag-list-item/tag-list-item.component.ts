import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[tag-list-item]',
  templateUrl: './tag-list-item.component.html',
  styleUrls: ['./tag-list-item.component.css']
})
export class TagListItemComponent implements OnInit {
  @Input() tag;
  @Input() columns: string[];

  constructor() { }

  ngOnInit() {
  }

}
