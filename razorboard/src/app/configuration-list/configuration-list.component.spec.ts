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

import { ConfigurationListComponent } from './configuration-list.component';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { HttpEventsServiceStub } from '../../testing/http-events.service.stub';
import { ConfigurationListItemComponent } from './configuration-list-item/configuration-list-item.component';

describe('ConfigurationListComponent', () => {
  let component: ConfigurationListComponent;
  let fixture: ComponentFixture<ConfigurationListComponent>;
  let httpEventsStub: HttpEventsServiceStub;
  let routeStub: ActivatedRouteStub;

  beforeEach(async(() => {
    httpEventsStub = new HttpEventsServiceStub();
    routeStub = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [ ConfigurationListComponent, ConfigurationListItemComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        ConfigurationListComponent,
        RazorapiService,
        { provide: HttpEventsService, useValue: httpEventsStub },
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: Title, useClass: Title },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationListComponent);
    component = fixture.componentInstance;
    routeStub.setQueryParams({search: null});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use getConfiguration', () => {
    spyOn(component.razorApi, 'getConfiguration');
    component.getData();
    expect(component.razorApi.getConfiguration).toHaveBeenCalledTimes(1);
  });

  it('should not filter', () => {
    expect(component.filterItem({name: 'test', value: 'test'}, 'notest')).toBeFalsy();
  });

  it('should filter by name', () => {
    expect(component.filterItem({name: 'test'}, 'test')).toBeTruthy();
    expect(component.filterItem({name: 'test'}, 'TEST')).toBeTruthy();
    expect(component.filterItem({name: 'TEST'}, 'TEST')).toBeTruthy();
    expect(component.filterItem({name: 'test'}, 'Test')).toBeTruthy();
  });

});
