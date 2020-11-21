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

import { PolledViewComponent } from '../polled-view';
import { TablePolledComponent } from '../table-polled/table-polled.component';

import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { HttpEventsServiceStub } from '../../testing/http-events.service.stub';
import { BrokersListComponent } from './brokers-list.component';
import { BrokerListItemComponent } from './broker-list-item/broker-list-item.component';

describe('BrokersListComponent', () => {
  let component: BrokersListComponent;
  let fixture: ComponentFixture<BrokersListComponent>;
  let httpEventsStub: HttpEventsServiceStub;
  let routeStub: ActivatedRouteStub;

  beforeEach(async(() => {
    httpEventsStub = new HttpEventsServiceStub();
    routeStub = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [
        BrokersListComponent,
        BrokerListItemComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        BrokersListComponent,
        RazorapiService,
        { provide: HttpEventsService, useValue: httpEventsStub },
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: Title, useClass: Title },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokersListComponent);
    component = fixture.componentInstance;
    routeStub.setQueryParams({search: null});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use getBrokers', () => {
    spyOn(component.razorApi, 'getBrokers');
    component.getData();
    expect(component.razorApi.getBrokers).toHaveBeenCalledTimes(1);
  });

  it('should not filter', () => {
    expect(component.filterItem({name: 'test'}, 'notest')).toBeFalsy();
  });

  it('should filter by name', () => {
    expect(component.filterItem({name: 'test'}, 'test')).toBeTruthy();
    expect(component.filterItem({name: 'test'}, 'TEST')).toBeTruthy();
    expect(component.filterItem({name: 'TEST'}, 'TEST')).toBeTruthy();
    expect(component.filterItem({name: 'test'}, 'Test')).toBeTruthy();
  });

  it('should filter by type', () => {
    expect(component.filterItem({type: 'test'}, 'test')).toBeTruthy();
    expect(component.filterItem({type: 'test'}, 'TEST')).toBeTruthy();
    expect(component.filterItem({type: 'TEST'}, 'TEST')).toBeTruthy();
    expect(component.filterItem({type: 'test'}, 'Test')).toBeTruthy();
  });

});
