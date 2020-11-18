import { Component, OnInit, Type } from '@angular/core';

import { PolledView } from '../polled-view';
import { ApiResponse } from '../models/apiresponse.model';

@Component({
  selector: 'app-table-polled',
  templateUrl: './table-polled.component.html',
  styleUrls: ['./table-polled.component.css']
})
export abstract class TablePolledComponent extends PolledView implements OnInit {

  private responseItems = [];
  protected rowComponent: Type<any>;
  protected name: string;
  page = 1;
  pageSize = 15;
  filter: string;
  sortField: string;
  sortReverse: boolean;
  showTotal: boolean;
  total = 0;
  filterTotal = 0;
  items = [];

  tableHeaders: {label: string, name: string, sort: boolean}[];
  pluralMapping: any;

  abstract generateItemsList;
  abstract filterItems;
  abstract orderItems;

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

}
