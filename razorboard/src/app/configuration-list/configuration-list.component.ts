import { Component, OnInit } from '@angular/core';

import { TablePolledComponent } from '../table-polled/table-polled.component';
import { ConfigurationListItemComponent } from './configuration-list-item/configuration-list-item.component';

import { ComponentFactoryResolver } from '@angular/core';
import { RazorapiService } from '../razorapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpEventsService } from '../http-events.service';

@Component({
  selector: 'app-configuration-list',
  templateUrl: '../table-polled/table-polled.component.html',
  styleUrls: [
    '../table-polled/table-polled.component.css',
    './configuration-list.component.css',
  ]
})
export class ConfigurationListComponent extends TablePolledComponent implements OnInit {

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
    filter = filter.toLowerCase();
    if (config.name.toLowerCase().includes(filter)) {
      return true;
    }
    return false;
  }
}
