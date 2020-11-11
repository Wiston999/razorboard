import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[broker-list-item]',
  templateUrl: './broker-list-item.component.html',
  styleUrls: ['./broker-list-item.component.css']
})
export class BrokerListItemComponent implements OnInit {
  @Input() broker;
  @Input() columns: string[];

  constructor() { }

  ngOnInit() {
  }

}
