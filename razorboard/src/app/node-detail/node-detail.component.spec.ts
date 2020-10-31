import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, async, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { RazorapiServiceMock } from '../../testing/razorapi.service.mock';

import { RazorapiService } from '../razorapi.service';
import { MacAddrPipe } from '../mac-addr.pipe';
import { NodeDetailComponent } from './node-detail.component';

describe('NodeDetailComponent', () => {
  let component: NodeDetailComponent;
  let fixture: ComponentFixture<NodeDetailComponent>;
  let routeStub: ActivatedRouteStub;

  beforeEach(async(() => {
    routeStub = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [ NodeDetailComponent, MacAddrPipe ],
      imports: [
        FormsModule,
        FontAwesomeModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [
        NodeDetailComponent,
        { provide: RazorapiService, useClass: RazorapiServiceMock },
        { provide: ActivatedRoute, useValue: routeStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDetailComponent);
    component = fixture.componentInstance;
    routeStub.setParamMap({id: 'node1'});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
