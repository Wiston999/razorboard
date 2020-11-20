import { Component, OnInit } from '@angular/core';

import { TablePolledComponent } from '../table-polled/table-polled.component';
import { ConfigurationListItemComponent } from './configuration-list-item/configuration-list-item.component';


@Component({
  selector: 'app-configuration-list',
  templateUrl: '../table-polled/table-polled.component.html',
  styleUrls: [
    '../table-polled/table-polled.component.css',
    './configuration-list.component.css',
  ]
})
export class ConfigurationListComponent extends TablePolledComponent implements OnInit {

  name = 'configuration';
  rowComponent = ConfigurationListItemComponent;
  sortField = 'name';
  tableHeaders =  [
    { label: 'Item', name: 'name', sort: true },
    { label: 'Value', name: 'value', sort: false },
  ];

  pluralMapping = {
    '=1': '1 configuration entry',
    other: '# configuration entries',
  };

  getData = () => this.razorApi.getConfiguration();

  filterItem(config: any, filter: string): boolean {
    if (config.name.includes(filter)) {
      return true;
    }
    return false;
  }
}
