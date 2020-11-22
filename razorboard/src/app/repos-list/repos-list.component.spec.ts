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
import { ReposListComponent } from './repos-list.component';
import { RepoListItemComponent } from './repo-list-item/repo-list-item.component';

describe('ReposListComponent', () => {
  let component: ReposListComponent;
  let fixture: ComponentFixture<ReposListComponent>;
  let httpEventsStub: HttpEventsServiceStub;
  let routeStub: ActivatedRouteStub;
  let baseRepo: any;

  beforeEach(async(() => {
    httpEventsStub = new HttpEventsServiceStub();
    routeStub = new ActivatedRouteStub();

    baseRepo = {
      name: 'aaaa',
      url: 'aaaa',
      iso_url: 'aaaa',
      task: {name: 'aaaa'},
    };

    TestBed.configureTestingModule({
      declarations: [
        ReposListComponent,
        RepoListItemComponent,
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
        ReposListComponent,
        RazorapiService,
        { provide: HttpEventsService, useValue: httpEventsStub },
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: Title, useClass: Title },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReposListComponent);
    component = fixture.componentInstance;
    routeStub.setQueryParams({search: null});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use getRepos', () => {
    spyOn(component.razorApi, 'getRepos');
    component.getData();
    expect(component.razorApi.getRepos).toHaveBeenCalledTimes(1);
  });

  it('should not filter', () => {
    expect(component.filterItem(baseRepo, 'notest')).toBeFalsy();
  });

  it('should filter by name', () => {
    baseRepo.name = 'test';
    expect(component.filterItem(baseRepo, 'test')).toBeTruthy();
    expect(component.filterItem(baseRepo, 'TEST')).toBeTruthy();
    baseRepo.name = 'TEST';
    expect(component.filterItem(baseRepo, 'TEST')).toBeTruthy();
    expect(component.filterItem(baseRepo, 'Test')).toBeTruthy();
  });

  it('should filter by url', () => {
    baseRepo.url = 'test';
    expect(component.filterItem(baseRepo, 'test')).toBeTruthy();
    expect(component.filterItem(baseRepo, 'TEST')).toBeTruthy();
    baseRepo.url = 'TEST';
    expect(component.filterItem(baseRepo, 'TEST')).toBeTruthy();
    expect(component.filterItem(baseRepo, 'Test')).toBeTruthy();
  });

  it('should filter by iso_url', () => {
    baseRepo.iso_url = 'test';
    expect(component.filterItem(baseRepo, 'test')).toBeTruthy();
    expect(component.filterItem(baseRepo, 'TEST')).toBeTruthy();
    baseRepo.iso_url = 'TEST';
    expect(component.filterItem(baseRepo, 'TEST')).toBeTruthy();
    expect(component.filterItem(baseRepo, 'Test')).toBeTruthy();
  });

  it('should filter by task.name', () => {
    baseRepo.task.name = 'test';
    expect(component.filterItem(baseRepo, 'test')).toBeTruthy();
    expect(component.filterItem(baseRepo, 'TEST')).toBeTruthy();
    baseRepo.task.name = 'TEST';
    expect(component.filterItem(baseRepo, 'TEST')).toBeTruthy();
    expect(component.filterItem(baseRepo, 'Test')).toBeTruthy();
  });
});
