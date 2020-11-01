import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, async, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { RazorapiServiceStub } from '../../testing/razorapi.service.stub';
import { nodeList } from '../../testing/apiresponse.model.mock';

import { RazorapiService } from '../razorapi.service';
import { MacAddrPipe } from '../mac-addr.pipe';
import { NodeDetailComponent } from './node-detail.component';

describe('NodeDetailComponent', () => {
  let component: NodeDetailComponent;
  let fixture: ComponentFixture<NodeDetailComponent>;
  let routeStub: ActivatedRouteStub;
  let razorApiStub: RazorapiServiceStub;
  const nodeObj = nodeList[0];

  beforeEach(async(() => {
    routeStub = new ActivatedRouteStub();
    razorApiStub = new RazorapiServiceStub();

    TestBed.configureTestingModule({
      declarations: [ NodeDetailComponent, MacAddrPipe ],
      imports: [
        FormsModule,
        FontAwesomeModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        NodeDetailComponent,
        { provide: RazorapiService, useValue: razorApiStub },
        { provide: ActivatedRoute, useValue: routeStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDetailComponent);
    component = fixture.componentInstance;
    component.showEmpty = false;
    routeStub.setParamMap({id: nodeObj.name});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show node name and hostname', () => {
    const content = fixture.nativeElement.querySelector('h2').textContent;
    expect(content).toContain(nodeObj.name);
    expect(content).toContain(`(${nodeObj.facts.hostname})`);
  });

  it('should show facts count', () => {
    const content = fixture.nativeElement.querySelector('#facts-title').textContent;
    const count = Object.values(nodeObj.facts).length;
    expect(content).toContain(`(${count})`);
  });

  it('should hide empty-value facts ', () => {
    const content = fixture.nativeElement.querySelectorAll('.fact-value[hidden]');
    const count = Object.values(nodeObj.facts).filter(f => f).length;
    const totalCount = Object.values(nodeObj.facts).length;
    expect(content.length).toBe(totalCount - count);
  });

  it('should show all facts ', () => {
    component.showEmpty = true;
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelectorAll('.fact-value');
    const count = Object.values(nodeObj.facts).length;
    expect(content.length).toBe(count);
  });
});
