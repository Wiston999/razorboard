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
import { TagsListComponent } from './tags-list.component';
import { TagListItemComponent } from './tag-list-item/tag-list-item.component';

import { RainbowBracketsPipe } from '../rainbow-brackets.pipe';

describe('TagsListComponent', () => {
  let component: TagsListComponent;
  let fixture: ComponentFixture<TagsListComponent>;

  let httpEventsStub: HttpEventsServiceStub;
  let routeStub: ActivatedRouteStub;

  beforeEach(async(() => {
    httpEventsStub = new HttpEventsServiceStub();
    routeStub = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [ TagsListComponent, TagListItemComponent, RainbowBracketsPipe ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        NgbModule,
      ],
      providers: [
        TagsListComponent,
        RazorapiService,
        { provide: HttpEventsService, useValue: httpEventsStub },
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: Title, useClass: Title },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsListComponent);
    component = fixture.componentInstance;
    routeStub.setQueryParams({search: null});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use getTags', () => {
    spyOn(component.razorApi, 'getTags');
    component.getData();
    expect(component.razorApi.getTags).toHaveBeenCalledTimes(1);
  });

  it('should not filter', () => {
    expect(component.filterItem({name: 'test', rule: ['test']}, 'notest')).toBeFalsy();
  });

  it('should filter by name', () => {
    expect(component.filterItem({name: 'test', rule: []}, 'test')).toBeTruthy();
    expect(component.filterItem({name: 'test', rule: []}, 'TEST')).toBeTruthy();
    expect(component.filterItem({name: 'TEST', rule: []}, 'TEST')).toBeTruthy();
    expect(component.filterItem({name: 'test', rule: []}, 'Test')).toBeTruthy();
  });

  it('should filter by rule', () => {
    expect(component.filterItem({name: 'aa', rule: ['test']}, 'test')).toBeTruthy();
    expect(component.filterItem({name: 'aa', rule: ['test']}, 'TEST')).toBeTruthy();
    expect(component.filterItem({name: 'aa', rule: ['TEST']}, 'TEST')).toBeTruthy();
    expect(component.filterItem({name: 'aa', rule: ['test']}, 'Test')).toBeTruthy();
  });
});
