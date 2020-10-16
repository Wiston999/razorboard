import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[hook-list-item]',
  templateUrl: './hook-list-item.component.html',
  styleUrls: ['./hook-list-item.component.css']
})
export class HookListItemComponent implements OnInit {
  @Input() hook;
  @Input() columns: string[];

  constructor() { }

  ngOnInit() {
  }

}
