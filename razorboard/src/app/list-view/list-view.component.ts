import { ComponentFactoryResolver, Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';
import { I18nPluralPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { NodesFilterPipe } from './nodes-filter.pipe';
import { TasksFilterPipe } from './tasks-filter.pipe';
import { TagsFilterPipe } from './tags-filter.pipe';
import { PoliciesFilterPipe } from './policies-filter.pipe';
import { ReposFilterPipe } from './repos-filter.pipe';
import { HooksFilterPipe } from './hooks-filter.pipe';
import { ConfigFilterPipe } from './config-filter.pipe';
import { BrokersFilterPipe } from './brokers-filter.pipe';

import { ApiResponse } from '../models/apiresponse.model';
import { HttpEventsService } from '../http-events.service';
import { RazorapiService } from '../razorapi.service';
import { PolledViewComponent } from '../polled-view';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
  providers: [
    NodesFilterPipe,
    TasksFilterPipe,
    TagsFilterPipe,
    PoliciesFilterPipe,
    ReposFilterPipe,
    HooksFilterPipe,
    BrokersFilterPipe,
    ConfigFilterPipe,
  ],
})
export class ListViewComponent extends PolledViewComponent implements OnInit {
  element: string;
  filter: string;
  sortField = 'name';
  sortReverse = false;
  showTotal = true;
  devMode = false;
  total = 0;
  filterTotal = 0;
  items = [];
  private responseItems = [];

  httpLoading: Subject<boolean> = this.httpEventsService.loading;

  headersMapping = {
    nodes: [
      { label: 'Name', name: 'name', sort: true },
      { label: 'MAC', name: 'dhcp_mac', sort: true },
      { label: 'Hostname', name: 'facts.hostname', sort: true },
      { label: 'Tags', name: 'tags', sort: false },
      { label: 'Facts', name: 'facts', sort: false },
      { label: 'Metadata', name: 'metadata', sort: false },
      { label: 'State', name: 'policy', sort: false },
      { label: 'Last seen', name: 'last_checkin', sort: true },
      { label: 'Actions', name: 'actions', sort: false },
    ],
    repos: [
      { label: 'name', name: 'name', sort: true },
      { label: 'URL', name: 'url', sort: false },
      { label: 'Default Task', name: 'task', sort: false },
    ],
    tags: [
      { label: 'name', name: 'name', sort: true },
      { label: 'Nodes', name: 'nodes.count', sort: true },
      { label: 'Policies', name: 'policies.count', sort: true },
      { label: 'Rule', name: 'rule', sort: false },
    ],
    tasks: [
      { label: 'name', name: 'name', sort: true },
      { label: 'Version', name: 'version', sort: false },
      { label: 'Base Task', name: 'task.name', sort: true },
      { label: 'Boot Sequence', name: 'boot_sequence', sort: false },
      { label: 'Description', name: 'description', sort: false },
    ],
    policies: [
      { label: 'name', name: 'name', sort: true },
      { label: 'Repository', name: 'repo.name', sort: true },
      { label: 'Broker', name: 'broker.name', sort: true },
      { label: 'Task', name: 'task.name', sort: true },
      { label: 'Tags', name: 'tags', sort: false },
      { label: 'Enabled?', name: 'enabled', sort: true },
      { label: '% Nodes', name: 'nodes', sort: false },
    ],
    brokers: [
      { label: 'name', name: 'name', sort: true },
      { label: 'Type', name: 'broker_type', sort: false },
      { label: 'Policies', name: 'policies.count', sort: true },
      { label: 'Configuration', name: 'configuration', sort: false },
    ],
    hooks: [
      { label: 'name', name: 'name', sort: true },
      { label: 'Type', name: 'hook_type', sort: true },
      { label: 'Actions', name: 'actions', sort: false },
    ],
    configuration: [
      { label: 'Item', name: 'name', sort: true },
      { label: 'Value', name: 'value', sort: false },
    ],
  };

  pluralMapping = {
    nodes: {
      '=1': '1 node',
      other: '# nodes',
    },
    repos: {
      '=1': '1 repository',
      other: '# repositories',
    },
    tags: {
      '=1': '1 tag',
      other: '# tags',
    },
    policies: {
      '=1': '1 policy',
      other: '# policies',
    },
    tasks: {
      '=1': '1 task',
      other: '# tasks',
    },
    brokers: {
      '=1': '1 broker',
      other: '# brokers',
    },
    hooks: {
      '=1': '1 hook',
      other: '# hooks',
    },
    configuration: {
      other: 'Configuration',
    },
  };

  constructor(
    protected razorApi: RazorapiService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected cfResolver: ComponentFactoryResolver,
    protected httpEventsService: HttpEventsService,
    private nodesFilter: NodesFilterPipe,
    private tasksFilter: TasksFilterPipe,
    private tagsFilter: TagsFilterPipe,
    private reposFilter: ReposFilterPipe,
    private policiesFilter: PoliciesFilterPipe,
    private hooksFilter: HooksFilterPipe,
    private configFilter: ConfigFilterPipe,
    private brokersFilter: BrokersFilterPipe,
    private titleService: Title,
  ) {
    super(razorApi, route, router, titleService, cfResolver, httpEventsService);
    this.devMode = isDevMode();
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.element = data.kind;
    });

    this.filter = this.route.snapshot.queryParams.search;
    this.setTitle();
    super.ngOnInit();
  }

  setTitle() {
    const element = this.element.charAt(0).toUpperCase() + this.element.substring(1);
    const title = [element];
    if (this.filter) {
      title.push(`Search: ${this.filter}`);
    }
    this.titleService.setTitle(title.join(' - '));
  }

  nodeCmp(node1: string, node2: string): number {
    const expr = /node(\d+)/;
    if (expr.test(node1) && expr.test(node2)) {
      const node1Number = node1.match(/node(\d+)/);
      const node2Number = node2.match(/node(\d+)/);
      return +node1Number[1] > +node2Number[1] ? 1 : -1;
    } else {
      return node1 > node2 ? 1 : -1;
    }
  }

  setSort(field: string) {
    if (field === this.sortField) {
      this.sortReverse = !this.sortReverse;
    } else {
      this.sortField = field;
      this.sortReverse = false;
    }
  }

  getData() {
    switch (this.element) {
      case 'nodes': {
        return this.razorApi.getNodes();
        break;
      }
      case 'repos': {
        return this.razorApi.getRepos();
        break;
      }
      case 'tags': {
        return this.razorApi.getTags();
        break;
      }
      case 'policies': {
        return this.razorApi.getPolicies();
        break;
      }
      case 'tasks': {
        return this.razorApi.getTasks();
        break;
      }
      case 'hooks': {
        return this.razorApi.getHooks();
        break;
      }
      case 'brokers': {
        return this.razorApi.getBrokers();
        break;
      }
      case 'configuration': {
        this.showTotal = false;
        return this.razorApi.getConfiguration();
        break;
      }
      default: {
        return null;
        break;
      }
    }
  }

  processData(response: ApiResponse) {
    this.total = response.total || response.items.length;
    this.responseItems = response.items;
    this.generateItemList();
  }

  filterItems(filter: string) {
    this.filter = filter;
    this.generateItemList();
    this.setTitle();
  }

  generateItemList() {
    this.items = this.responseItems.filter(
      item => !this.filter || this.filterItem(item, this.filter)
    );
    this.filterTotal = this.items.length;
  }

  filterItem(item, filter: string): boolean {
    switch (this.element) {
      case 'nodes': {
        return this.nodesFilter.filterNode(item, filter);
        break;
      }
      case 'repos': {
        return this.reposFilter.filterRepo(item, filter);
        break;
      }
      case 'tags': {
        return this.tagsFilter.filterTag(item, filter);
        break;
      }
      case 'policies': {
        return this.policiesFilter.filterPolicy(item, filter);
        break;
      }
      case 'tasks': {
        return this.tasksFilter.filterTask(item, filter);
        break;
      }
      case 'brokers': {
        return this.brokersFilter.filterBroker(item, filter);
        break;
      }
      case 'hooks': {
        return this.hooksFilter.filterHook(item, filter);
        break;
      }
      case 'configuration': {
        return this.configFilter.filterConfig(item, filter);
        break;
      }
      default: {
        return false;
        break;
      }
    }
  }
}
