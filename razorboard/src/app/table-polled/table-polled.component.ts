import { Component, OnInit, Type, AfterViewInit, ViewChildren, QueryList, EventEmitter } from '@angular/core';

import { ComponentFactoryResolver } from '@angular/core';
import { RazorapiService } from '../razorapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpEventsService } from '../http-events.service';

import { TableRowDirective } from './table-row.directive';
import { PolledViewComponent } from '../polled-view';
import { ApiResponse } from '../models/apiresponse.model';

export interface RowComponent {
  data: any;
  filter: EventEmitter<string>;
}

export abstract class TablePolledComponent extends PolledViewComponent implements OnInit, AfterViewInit {

  private responseItems = [];
  private rowViews = [];
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
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.filter = this.route.snapshot.queryParams.search;
    this.setTitle();
  }

  ngAfterViewInit() {
    this.rowHosts.changes.subscribe(views => {
      this.rowViews = views;
      this.loadRowViews(views);
    });
  }

  compareItems(a: any, b: any, field: string, reverse: boolean): number {
    return (a[field] > b[field] ? 1 : -1) * (reverse ? -1 : 1);
  }

  generateItemsList() {
    this.items = this.responseItems.filter(
      item => !this.filter || this.filterItem(item, this.filter)
    ).sort(
      (a, b) => this.compareItems(a, b, this.sortField, this.sortReverse)
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
    this.generateItemsList();
    // Force rows render, as the number of them hasn't changed, and so the subscription
    // to changes is not triggered
    this.loadRowViews(this.rowViews);
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
    this.setUrlSearch(filter);
  }

  itemIdentity(item) {
    return item.id;
  }

  private loadRowViews(views) {
    views.forEach((rowHost, i) => {
      const componentFactory = this.cfResolver.resolveComponentFactory(this.rowComponent);
      const viewContainerRef = rowHost.viewContainerRef;

      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);

      componentRef.instance.data = this.items[i];
      componentRef.instance.filter.subscribe(($event) => this.filterItems($event));

      // Hacky way to make rowHost directive look like a table row
      viewContainerRef.element.nativeElement.nextSibling.style.display = 'contents';

      componentRef.changeDetectorRef.detectChanges();
    });
  }
}
