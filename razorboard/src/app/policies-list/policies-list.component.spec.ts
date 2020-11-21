import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ComponentFactoryResolver } from '@angular/core';
import { RazorapiService } from '../razorapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpEventsService } from '../http-events.service';

import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { HttpEventsServiceStub } from '../../testing/http-events.service.stub';
import { PoliciesListComponent } from './policies-list.component';
import { PolicyListItemComponent } from './policy-list-item/policy-list-item.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('PoliciesListComponent', () => {
  let component: PoliciesListComponent;
  let fixture: ComponentFixture<PoliciesListComponent>;

  let httpEventsStub: HttpEventsServiceStub;
  let routeStub: ActivatedRouteStub;
  let basePolicy: any;

  beforeEach(async(() => {
    httpEventsStub = new HttpEventsServiceStub();
    routeStub = new ActivatedRouteStub();

    basePolicy = {
      name: 'aaaa',
      repo: { name: 'aaaa'},
      broker: { name: 'aaaa'},
      task: { name: 'aaaa'},
      tags: [{ name: 'aaaa'}],
    };

    TestBed.configureTestingModule({
      declarations: [ PoliciesListComponent, PolicyListItemComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        NgbModule,
      ],
      providers: [
        PoliciesListComponent,
        RazorapiService,
        { provide: HttpEventsService, useValue: httpEventsStub },
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: Title, useClass: Title },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesListComponent);
    component = fixture.componentInstance;
    routeStub.setQueryParams({search: null});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use getPolicies', () => {
    spyOn(component.razorApi, 'getPolicies');
    component.getData();
    expect(component.razorApi.getPolicies).toHaveBeenCalledTimes(1);
  });

  it('should not filter', () => {
    expect(component.filterItem(basePolicy, 'notest')).toBeFalsy();
  });

  it('should filter by name', () => {
    basePolicy.name = 'test';
    expect(component.filterItem(basePolicy, 'test')).toBeTruthy();
    expect(component.filterItem(basePolicy, 'TEST')).toBeTruthy();
    basePolicy.name = 'TEST';
    expect(component.filterItem(basePolicy, 'TEST')).toBeTruthy();
    expect(component.filterItem(basePolicy, 'Test')).toBeTruthy();
  });

  it('should filter by repo.name', () => {
    basePolicy.repo.name = 'test';
    expect(component.filterItem(basePolicy, 'test')).toBeTruthy();
    expect(component.filterItem(basePolicy, 'TEST')).toBeTruthy();
    basePolicy.repo.name = 'TEST';
    expect(component.filterItem(basePolicy, 'TEST')).toBeTruthy();
    expect(component.filterItem(basePolicy, 'Test')).toBeTruthy();
  });

  it('should filter by task.name', () => {
    basePolicy.task.name = 'test';
    expect(component.filterItem(basePolicy, 'test')).toBeTruthy();
    expect(component.filterItem(basePolicy, 'TEST')).toBeTruthy();
    basePolicy.task.name = 'TEST';
    expect(component.filterItem(basePolicy, 'TEST')).toBeTruthy();
    expect(component.filterItem(basePolicy, 'Test')).toBeTruthy();
  });

  it('should filter by broker.name', () => {
    basePolicy.broker.name = 'test';
    expect(component.filterItem(basePolicy, 'test')).toBeTruthy();
    expect(component.filterItem(basePolicy, 'TEST')).toBeTruthy();
    basePolicy.broker.name = 'TEST';
    expect(component.filterItem(basePolicy, 'TEST')).toBeTruthy();
    expect(component.filterItem(basePolicy, 'Test')).toBeTruthy();
  });

  it('should filter by tag', () => {
    basePolicy.tags[0].name = 'test';
    expect(component.filterItem(basePolicy, 'test')).toBeTruthy();
    expect(component.filterItem(basePolicy, 'TEST')).toBeTruthy();
    basePolicy.tags[0].name = 'TEST';
    expect(component.filterItem(basePolicy, 'TEST')).toBeTruthy();
    expect(component.filterItem(basePolicy, 'Test')).toBeTruthy();
  });

});
