import { Component, OnInit, Type, AfterViewInit, ViewChildren, QueryList, EventEmitter } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { TableRowDirective } from './table-row.directive';
import { RazorapiService } from '../razorapi.service';
import { PolledViewComponent } from '../polled-view';
import { ApiResponse } from '../models/apiresponse.model';

export interface RowComponent {
  data: any;
  filter: EventEmitter<string>;
}

@Component({
  selector: 'app-table-polled',
  templateUrl: './table-polled.component.html',
  styleUrls: ['./table-polled.component.css']
})
export abstract class TablePolledComponent extends PolledViewComponent implements OnInit, AfterViewInit {

  private responseItems = [];
  protected abstract rowComponent: Type<any>;
  @ViewChildren(TableRowDirective) rowHosts: QueryList<TableRowDirective>;
  protected abstract name: string;
  page = 1;
  pageSize = 10000;
  filter: string;
  sortField: string;
  sortReverse: boolean;
  showTotal = true;
  total = 0;
  filterTotal = 0;
  items = [];

  tableHeaders: {label: string, name: string, sort: boolean}[];
  pluralMapping: any;

  abstract filterItem(item: any, filter: string): boolean;

  ngOnInit() {
    this.filter = this.route.snapshot.queryParams.search;
    this.setTitle();
    super.ngOnInit();
  }

  ngAfterViewInit() {
    console.log('after view init');
    this.rowHosts.changes.subscribe( views => {
      console.log('Rows changed', views);
      views.forEach((rowHost, i) => {
        const componentFactory = this.cfResolver.resolveComponentFactory(this.rowComponent);
        const viewContainerRef = rowHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.data = this.items[i];
        viewContainerRef.changeDetectorRef.detectChanges();
        console.log('Generated', componentRef, 'from', this.items[i]);
        // (<RowComponent> componentRef.instance).data = adItem.data;
      });
    });
  }

  compareItems(a, b): number {
    return a[this.sortField] > b[this.sortField] ? 1 : -1;
  }

  generateItemsList() {
    this.items = this.responseItems.filter(
      item => !this.filter || this.filterItem(item, this.filter)
    ).sort(
      (a, b) => this.compareItems(a, b)
    ).slice(
      (this.page - 1) * this.pageSize, this.page * this.pageSize
    );
    this.filterTotal = this.items.length;
  }

  setTitle() {
    const name = this.name.charAt(0).toUpperCase() + this.name.substring(1);
    const title = [name];
    if (this.filter) {
      title.push(`Search: ${this.filter}`);
    }
    this.title.setTitle(title.join(' - '));
  }

  setSort(field: string) {
    if (field === this.sortField) {
      this.sortReverse = !this.sortReverse;
    } else {
      this.sortField = field;
      this.sortReverse = false;
    }
  }

  processData(response: ApiResponse) {
    this.total = response.total || response.items.length;
    this.responseItems = response.items;
    this.generateItemsList();
  }

  filterItems(filter: string) {
    this.filter = filter;
    this.generateItemsList();
    this.setTitle();
  }

  loadRowComponents() {
    this.rowHosts.forEach((rowHost, i) => {
      const componentFactory = this.cfResolver.resolveComponentFactory(this.rowComponent);
      const viewContainerRef = rowHost.viewContainerRef;
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent(componentFactory);
      componentRef.instance.data = this.items[i];
      console.log('Generated', componentRef, 'from', this.items[i]);
      // (<RowComponent> componentRef.instance).data = adItem.data;
    });
  }
}
