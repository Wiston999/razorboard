import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[config-list-item]',
  templateUrl: './config-list-item.component.html',
  styleUrls: ['./config-list-item.component.css']
})
export class ConfigListItemComponent implements OnInit {
  @Input() config;
  @Input() columns: string[];

  constructor() { }

  ngOnInit() {
  }

}
