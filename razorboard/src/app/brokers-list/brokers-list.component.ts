import { Component, OnInit } from '@angular/core';

import { TablePolledComponent } from '../table-polled/table-polled.component';
import { BrokerListItemComponent } from './broker-list-item/broker-list-item.component';

import { ComponentFactoryResolver } from '@angular/core';
import { RazorapiService } from '../razorapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpEventsService } from '../http-events.service';

@Component({
  selector: 'app-brokers-list',
  templateUrl: '../table-polled/table-polled.component.html',
  styleUrls: [
    '../table-polled/table-polled.component.css',
    './brokers-list.component.css',
  ]
})
export class BrokersListComponent extends TablePolledComponent implements OnInit {

  constructor(
    public razorApi: RazorapiService,
    public route: ActivatedRoute,
    public router: Router,
    public title: Title,
    public httpEventsService: HttpEventsService,
    public cfResolver: ComponentFactoryResolver,
  ) {
    super(
      razorApi,
      route,
      router,
      title,
      httpEventsService,
      cfResolver,
    );
  }

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
    if (broker.name.toLowerCase().includes(filter.toLowerCase())) {
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
