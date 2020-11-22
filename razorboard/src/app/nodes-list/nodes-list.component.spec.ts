import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentFactoryResolver } from '@angular/core';
import { RazorapiService } from '../razorapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpEventsService } from '../http-events.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PolledViewComponent } from '../polled-view';
import { TablePolledComponent } from '../table-polled/table-polled.component';

import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { HttpEventsServiceStub } from '../../testing/http-events.service.stub';
import { NodesListComponent } from './nodes-list.component';
import { NodeListItemComponent } from './node-list-item/node-list-item.component';

import { MacAddrPipe } from '../mac-addr.pipe';
import { Node } from '../models/node.model';

describe('NodesListComponent', () => {
  let component: NodesListComponent;
  let fixture: ComponentFixture<NodesListComponent>;
  let httpEventsStub: HttpEventsServiceStub;
  let routeStub: ActivatedRouteStub;
  let baseNode: any;

  beforeEach(async(() => {
    httpEventsStub = new HttpEventsServiceStub();
    routeStub = new ActivatedRouteStub();

    baseNode = {
      name: 'aaaa',
      dhcp_mac: 'aa-aa-aa-aa-aa',
      facts: {hostname: 'aaaa'},
      policy: {name: 'aaaa'},
      state: {installed: 'aaaa'},
      tags: [{name: 'aaaa'}],
    };

    TestBed.configureTestingModule({
      declarations: [
        NodesListComponent,
        NodeListItemComponent,
        MacAddrPipe,
      ],
      imports: [
        FormsModule,
        FontAwesomeModule,
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        NgbModule,
      ],
      providers: [
        NodesListComponent,
        RazorapiService,
        { provide: HttpEventsService, useValue: httpEventsStub },
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: Title, useClass: Title },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodesListComponent);
    component = fixture.componentInstance;
    routeStub.setQueryParams({search: null});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use getNodes', () => {
    spyOn(component.razorApi, 'getNodes');
    component.getData();
    expect(component.razorApi.getNodes).toHaveBeenCalledTimes(1);
  });

  it('should not filter', () => {
    expect(component.filterItem(baseNode, 'notest')).toBeFalsy();
  });

  it('should filter by name', () => {
    baseNode.name = 'test';
    expect(component.filterItem(baseNode, 'test')).toBeTruthy();
    expect(component.filterItem(baseNode, 'TEST')).toBeTruthy();
    baseNode.name = 'TEST';
    expect(component.filterItem(baseNode, 'TEST')).toBeTruthy();
    expect(component.filterItem(baseNode, 'Test')).toBeTruthy();
  });

  it('should filter by policy.name', () => {
    baseNode.policy.name = 'test';
    expect(component.filterItem(baseNode, 'test')).toBeTruthy();
    expect(component.filterItem(baseNode, 'TEST')).toBeTruthy();
    baseNode.policy.name = 'TEST';
    expect(component.filterItem(baseNode, 'TEST')).toBeTruthy();
    expect(component.filterItem(baseNode, 'Test')).toBeTruthy();
  });

  it('should filter by state.installed', () => {
    baseNode.state.installed = 'test';
    expect(component.filterItem(baseNode, 'test')).toBeTruthy();
    expect(component.filterItem(baseNode, 'TEST')).toBeTruthy();
    baseNode.state.installed = 'TEST';
    expect(component.filterItem(baseNode, 'TEST')).toBeTruthy();
    expect(component.filterItem(baseNode, 'Test')).toBeTruthy();
  });

  it('should filter by facts.hostname', () => {
    baseNode.facts.hostname = 'test';
    expect(component.filterItem(baseNode, 'test')).toBeTruthy();
    expect(component.filterItem(baseNode, 'TEST')).toBeTruthy();
    baseNode.facts.hostname = 'TEST';
    expect(component.filterItem(baseNode, 'TEST')).toBeTruthy();
    expect(component.filterItem(baseNode, 'Test')).toBeTruthy();
  });

  it('should filter by tags', () => {
    baseNode.tags[0].name = 'test';
    expect(component.filterItem(baseNode, 'test')).toBeTruthy();
    expect(component.filterItem(baseNode, 'TEST')).toBeTruthy();
    baseNode.tags[0].name = 'TEST';
    expect(component.filterItem(baseNode, 'TEST')).toBeTruthy();
    expect(component.filterItem(baseNode, 'Test')).toBeTruthy();
  });

  it('should filter by dhcp_mac', () => {
    expect(component.filterItem(baseNode, 'aa-aa-aa')).toBeTruthy();
    expect(component.filterItem(baseNode, 'aa:aa:aa')).toBeTruthy();
  });

  it('should compare items by name', () => {
    expect(component.compareItems(
      {name: 'node1'} as Node,
      {name: 'node2'} as Node,
      'name',
      false
    )).toEqual(-1);
    expect(component.compareItems(
      {name: 'node2'} as Node,
      {name: 'node1'} as Node,
      'name',
      true
    )).toEqual(-1);
    expect(component.compareItems(
      {name: 'node1'} as Node,
      {name: 'node2'} as Node,
      'name',
      true
    )).toEqual(1);
    expect(component.compareItems(
      {name: 'node2'} as Node,
      {name: 'node1'} as Node,
      'name',
      false
    )).toEqual(1);
  });

  it('should compare items by facts.hostname', () => {
    expect(component.compareItems(
      {facts: {hostname: 'node1'}} as Node,
      {facts: {hostname: 'node2'}} as Node,
      'facts.hostname',
      false
    )).toEqual(-1);
    expect(component.compareItems(
      {facts: {hostname: 'node2'}} as Node,
      {facts: {hostname: 'node1'}} as Node,
      'facts.hostname',
      true
    )).toEqual(-1);
    expect(component.compareItems(
      {facts: {hostname: 'node1'}} as Node,
      {facts: {hostname: 'node2'}} as Node,
      'facts.hostname',
      true
    )).toEqual(1);
    expect(component.compareItems(
      {facts: {hostname: 'node2'}} as Node,
      {facts: {hostname: 'node1'}} as Node,
      'facts.hostname',
      false
    )).toEqual(1);
  });

  it('should compare items by other field call parent', () => {
    spyOn(TablePolledComponent.prototype, 'compareItems');
    component.compareItems(
      {name: 'node1'} as Node,
      {name: 'node2'} as Node,
      'other',
      false
    );
    expect(TablePolledComponent.prototype.compareItems).toHaveBeenCalledWith({name: 'node1'}, {name: 'node2'}, 'other', false);
    component.compareItems(
      {name: 'node1'} as Node,
      {name: 'node2'} as Node,
      'other',
      true
    );
    expect(TablePolledComponent.prototype.compareItems).toHaveBeenCalledWith({name: 'node1'}, {name: 'node2'}, 'other', true);
  });
});
