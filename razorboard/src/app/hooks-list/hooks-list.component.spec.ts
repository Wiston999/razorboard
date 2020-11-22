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

import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { HttpEventsServiceStub } from '../../testing/http-events.service.stub';
import { HooksListComponent } from './hooks-list.component';
import { HookListItemComponent } from './hook-list-item/hook-list-item.component';

describe('HooksListComponent', () => {
  let component: HooksListComponent;
  let fixture: ComponentFixture<HooksListComponent>;

  let httpEventsStub: HttpEventsServiceStub;
  let routeStub: ActivatedRouteStub;

  beforeEach(async(() => {
    httpEventsStub = new HttpEventsServiceStub();
    routeStub = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [ HooksListComponent, HookListItemComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        NgbModule,
      ],
      providers: [
        HooksListComponent,
        RazorapiService,
        { provide: HttpEventsService, useValue: httpEventsStub },
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: Title, useClass: Title },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HooksListComponent);
    component = fixture.componentInstance;
    routeStub.setQueryParams({search: null});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use getHooks', () => {
    spyOn(component.razorApi, 'getHooks');
    component.getData();
    expect(component.razorApi.getHooks).toHaveBeenCalledTimes(1);
  });

  it('should not filter', () => {
    expect(component.filterItem({name: 'test', hook_type: 'test'}, 'notest')).toBeFalsy();
  });

  it('should filter by name', () => {
    expect(component.filterItem({name: 'test'}, 'test')).toBeTruthy();
    expect(component.filterItem({name: 'test'}, 'TEST')).toBeTruthy();
    expect(component.filterItem({name: 'TEST'}, 'TEST')).toBeTruthy();
    expect(component.filterItem({name: 'test'}, 'Test')).toBeTruthy();
  });

  it('should filter by hook_type', () => {
    expect(component.filterItem({name: 'aa', hook_type: 'test'}, 'test')).toBeTruthy();
    expect(component.filterItem({name: 'aa', hook_type: 'test'}, 'TEST')).toBeTruthy();
    expect(component.filterItem({name: 'aa', hook_type: 'TEST'}, 'TEST')).toBeTruthy();
    expect(component.filterItem({name: 'aa', hook_type: 'test'}, 'Test')).toBeTruthy();
  });
});
