import { Component, OnInit } from '@angular/core';

import { TablePolledComponent } from '../table-polled/table-polled.component';
import { TagListItemComponent } from './tag-list-item/tag-list-item.component';

@Component({
  selector: 'app-tags-list',
  templateUrl: '../table-polled/table-polled.component.html',
  styleUrls: [
    '../table-polled/table-polled.component.css',
    './tags-list.component.css',
  ]
})
export class TagsListComponent extends TablePolledComponent implements OnInit {

  name = 'tags';
  rowComponent = TagListItemComponent;
  sortField = 'name';
  tableHeaders =  [
    { label: 'name', name: 'name', sort: true },
    { label: 'Nodes', name: 'nodes.count', sort: true },
    { label: 'Policies', name: 'policies.count', sort: true },
    { label: 'Rule', name: 'rule', sort: false },
  ];

  pluralMapping = {
    '=1': '1 tag',
    other: '# tags',
  };

  getData = () => this.razorApi.getTags();

  filterItem(tag: any, filter: string): boolean {
    if (tag.name.includes(filter)) {
      return true;
    }
    if (JSON.stringify(tag.rule).includes(filter)) {
      return true;
    }
    return false;
  }
}
