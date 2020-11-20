import { Component, OnInit } from '@angular/core';

import { TablePolledComponent } from '../table-polled/table-polled.component';
import { BrokerListItemComponent } from './broker-list-item/broker-list-item.component';

@Component({
  selector: 'app-brokers-list',
  templateUrl: '../table-polled/table-polled.component.html',
  styleUrls: [
    '../table-polled/table-polled.component.css',
    './brokers-list.component.css',
  ]
})
export class BrokersListComponent extends TablePolledComponent implements OnInit {

  name = 'brokers';
  rowComponent = BrokerListItemComponent;
  sortField = 'name';
  tableHeaders =  [
    { label: 'name', name: 'name', sort: true },
    { label: 'Type', name: 'broker_type', sort: false },
    { label: 'Policies', name: 'policies.count', sort: true },
    { label: 'Configuration', name: 'configuration', sort: false },
  ];

  pluralMapping = {
    '=1': '1 broker',
    other: '# brokers',
  };

  getData = () => this.razorApi.getBrokers();

  filterItem(broker: any, filter: string): boolean {
    if (broker.name.includes(filter)) {
      return true;
    }
    if (broker.type && broker.type.includes(filter)) {
      return true;
    }
    for (const confKey of Object.keys(broker.configuration)) {
      const confValue = broker.configuration[confKey];
      if (confKey.includes(filter) || confValue.includes(filter)) {
        return true;
      }
    }
    return false;
  }
}
