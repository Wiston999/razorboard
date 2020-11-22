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

import { PolledViewComponent } from '../polled-view';
import { TablePolledComponent } from '../table-polled/table-polled.component';

import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { HttpEventsServiceStub } from '../../testing/http-events.service.stub';
import { TasksListComponent } from './tasks-list.component';
import { TaskListItemComponent } from './task-list-item/task-list-item.component';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let httpEventsStub: HttpEventsServiceStub;
  let routeStub: ActivatedRouteStub;
  let baseTask: any;

  beforeEach(async(() => {
    httpEventsStub = new HttpEventsServiceStub();
    routeStub = new ActivatedRouteStub();

    baseTask = {
      name: 'aaaa',
      description: 'aaaa',
      base: {name: 'aaaa'},
    };

    TestBed.configureTestingModule({
      declarations: [
        TasksListComponent,
        TaskListItemComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        NgbModule,
      ],
      providers: [
        TasksListComponent,
        RazorapiService,
        { provide: HttpEventsService, useValue: httpEventsStub },
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: Title, useClass: Title },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    routeStub.setQueryParams({search: null});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use getTasks', () => {
    spyOn(component.razorApi, 'getTasks');
    component.getData();
    expect(component.razorApi.getTasks).toHaveBeenCalledTimes(1);
  });

  it('should not filter', () => {
    expect(component.filterItem(baseTask, 'notest')).toBeFalsy();
  });

  it('should filter by name', () => {
    baseTask.name = 'test';
    expect(component.filterItem(baseTask, 'test')).toBeTruthy();
    expect(component.filterItem(baseTask, 'TEST')).toBeTruthy();
    baseTask.name = 'TEST';
    expect(component.filterItem(baseTask, 'TEST')).toBeTruthy();
    expect(component.filterItem(baseTask, 'Test')).toBeTruthy();
  });

  it('should filter by base.name', () => {
    baseTask.base.name = 'test';
    expect(component.filterItem(baseTask, 'test')).toBeTruthy();
    expect(component.filterItem(baseTask, 'TEST')).toBeTruthy();
    baseTask.base.name = 'TEST';
    expect(component.filterItem(baseTask, 'TEST')).toBeTruthy();
    expect(component.filterItem(baseTask, 'Test')).toBeTruthy();
  });

  it('should filter by description', () => {
    baseTask.description = 'test';
    expect(component.filterItem(baseTask, 'test')).toBeTruthy();
    expect(component.filterItem(baseTask, 'TEST')).toBeTruthy();
    baseTask.description = 'TEST';
    expect(component.filterItem(baseTask, 'TEST')).toBeTruthy();
    expect(component.filterItem(baseTask, 'Test')).toBeTruthy();
  });
});
