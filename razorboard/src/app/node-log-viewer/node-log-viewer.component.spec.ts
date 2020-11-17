import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, async, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { RazorapiServiceStub } from '../../testing/razorapi.service.stub';
import { nodeList, nodeLogs } from '../../testing/apiresponse.model.mock';

import { OrderModule, OrderPipe } from 'ngx-order-pipe';
import { RazorapiService } from '../razorapi.service';
import { NodeLogViewerComponent } from './node-log-viewer.component';

describe('NodeLogViewerComponent', () => {
  let component: NodeLogViewerComponent;
  let fixture: ComponentFixture<NodeLogViewerComponent>;
  let routeStub: ActivatedRouteStub;
  let razorApiStub: RazorapiServiceStub;
  let titleService: Title;
  const nodeObj = nodeList[0];
  const date = new DatePipe('en');

  beforeEach(async(() => {
    routeStub = new ActivatedRouteStub();
    razorApiStub = new RazorapiServiceStub();

    TestBed.configureTestingModule({
      declarations: [ NodeLogViewerComponent, OrderPipe],
      imports: [
        FormsModule,
        FontAwesomeModule,
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        NodeLogViewerComponent,
        { provide: RazorapiService, useValue: razorApiStub },
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: Title, useClass: Title },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeLogViewerComponent);
    component = fixture.componentInstance;
    routeStub.setParamMap({id: nodeObj.name});
    routeStub.setQueryParams({search: null});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should throw error on undefined node', () => {
    component.nodeId = null;
    expect(() => component.getData()).toThrow(new Error('Node ID is undefined'));
  });

  it('should change title', () => {
    titleService = TestBed.get(Title);
    const title = titleService.getTitle();
    expect(title).toBe(`Node Logs - ${nodeObj.name}`);
  });

  it('should change search title', fakeAsync(() => {
    component.filter = 'test-filter';
    component.setTitle();
    tick();
    titleService = TestBed.get(Title);
    const title = titleService.getTitle();
    expect(title).toBe(`Node Logs - ${nodeObj.name} - Search: ${component.filter}`);
  }));

  it('should render table rows', () => {
    const content = fixture.nativeElement.querySelectorAll('tr');
    expect(content.length).toBe(nodeLogs.length);
  });

  it('should render timestamp column', () => {
    const content = fixture.nativeElement.querySelectorAll('tr > td:nth-of-type(1)');
    content.forEach((v, i) => {
      expect(v.textContent.trim()).toBe(date.transform(nodeLogs[i].timestamp, 'yyyy-MM-dd HH:mm:ss'));
    });
  });

  it('should render severity column', () => {
    const content = fixture.nativeElement.querySelectorAll('tr > td:nth-of-type(2)');
    content.forEach((v, i) => {
      expect(v.textContent.trim()).toBe(nodeLogs[i].severity.toUpperCase());
    });
  });

  it('should render default generate items', () => {
    spyOn(component, 'setUrlSearch');
    spyOn(component, 'setTitle');
    component.generateItemList();
    expect(component.filterTotal).toEqual(nodeLogs.length);
    expect(component.setUrlSearch).toHaveBeenCalled();
    expect(component.setTitle).toHaveBeenCalled();
  });

  it('should render filtered items', () => {
    component.filter = 'error';
    spyOn(component, 'setUrlSearch');
    spyOn(component, 'setTitle');
    component.generateItemList();
    expect(component.filterTotal).toEqual(1);
    expect(component.setUrlSearch).toHaveBeenCalled();
    expect(component.setTitle).toHaveBeenCalled();
  });

  it('should not filter', () => {
    expect(component.filterItem({msg: 'test'}, 'notest')).toBeFalsy();
  });

  it('should filter by msg', () => {
    expect(component.filterItem({msg: 'test'}, 'test')).toBeTruthy();
    expect(component.filterItem({msg: 'test'}, 'TEST')).toBeTruthy();
    expect(component.filterItem({msg: 'TEST'}, 'TEST')).toBeTruthy();
    expect(component.filterItem({msg: 'test'}, 'Test')).toBeTruthy();
  });

  it('should filter by severity', () => {
    expect(component.filterItem({severity: 'error'}, 'error')).toBeTruthy();
    expect(component.filterItem({severity: 'error'}, 'ERROR')).toBeTruthy();
  });

  it('should filter by event', () => {
    expect(component.filterItem({event: 'test'}, 'test')).toBeTruthy();
  });

  it('should filter by stage', () => {
    expect(component.filterItem({stage: 'test'}, 'test')).toBeTruthy();
  });

  it('should filter by action', () => {
    expect(component.filterItem({action: 'test'}, 'test')).toBeTruthy();
  });

  it('should filter by error', () => {
    expect(component.filterItem({error: 'test'}, 'test')).toBeTruthy();
  });

  it('should filter by repo', () => {
    expect(component.filterItem({repo: 'test'}, 'test')).toBeTruthy();
  });

  it('should filter by script', () => {
    expect(component.filterItem({script: 'test'}, 'test')).toBeTruthy();
  });

  it('should filter by url', () => {
    expect(component.filterItem({url: 'test'}, 'test')).toBeTruthy();
  });

  it('should filter by template', () => {
    expect(component.filterItem({template: 'test'}, 'test')).toBeTruthy();
  });

  it('should filter by policy', () => {
    expect(component.filterItem({policy: 'test'}, 'test')).toBeTruthy();
  });
});
