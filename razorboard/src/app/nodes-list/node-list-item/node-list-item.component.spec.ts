import { fakeAsync, tick, discardPeriodicTasks, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { RazorapiServiceStub } from '../../../testing/razorapi.service.stub';
import { nodeList } from '../../../testing/apiresponse.model.mock';

import { RazorapiService } from '../../razorapi.service';
import { NodeReinstallModalComponent } from '../../node-reinstall-modal/node-reinstall-modal.component';
import { MacAddrPipe } from '../../mac-addr.pipe';
import { NodeListItemComponent } from './node-list-item.component';

class DummyComponent {

}

export class MockNgbModalONRef {
  componentInstance = {
    nodeId: undefined,
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve(true));
}

export class MockNgbModalOFFRef {
  componentInstance = {
    nodeId: undefined,
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve('off'));
}

describe('NodeListItemComponent', () => {
  let component: NodeListItemComponent;
  let fixture: ComponentFixture<NodeListItemComponent>;
  let ngbModal: NgbModal;
  let razorApiStub: RazorapiServiceStub;
  const mockModalOnRef: MockNgbModalONRef = new MockNgbModalONRef();
  const mockModalOffRef: MockNgbModalOFFRef = new MockNgbModalOFFRef();
  const macAddr = new MacAddrPipe();
  const nodeObj = nodeList[0];

  beforeEach(async(() => {
    razorApiStub = new RazorapiServiceStub();
    TestBed.configureTestingModule({
      declarations: [
        NodeListItemComponent,
        NodeReinstallModalComponent,
        MacAddrPipe
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'nodes/:id', component: DummyComponent},
          {path: 'nodes/:id/log', component: DummyComponent},
        ]),
        FontAwesomeModule,
        HttpClientModule,
        NoopAnimationsModule,
        ToastrModule.forRoot(),
        NgbModule,
      ],
      providers: [
        { provide: RazorapiService, useValue: razorApiStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeListItemComponent);
    component = fixture.componentInstance;
    component.data = JSON.parse(JSON.stringify(nodeObj)); // Deep copy
    ngbModal = TestBed.get(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show node column', () => {
    const content = fixture.nativeElement.querySelector('th > a');
    expect(content.textContent.trim()).toBe(nodeObj.name);
    expect(content.href).toMatch(new RegExp(`/${nodeObj.name}$`));
  });

  it('should show mac-address column', () => {
    const content = fixture.nativeElement.querySelector('td:nth-of-type(1) > a');
    expect(content.textContent.trim()).toBe(macAddr.transform(nodeObj.dhcp_mac));
    expect(content.href).toMatch(new RegExp(`/${nodeObj.name}$`));
  });

  it('should show hostname column', () => {
    const content = fixture.nativeElement.querySelector('td:nth-of-type(2)');
    expect(content.textContent.trim()).toBe(nodeObj.facts.hostname);
  });

  it('should show null hostname column', fakeAsync(() => {
    delete component.data.facts.hostname;
    fixture.detectChanges();
    tick();

    let content = fixture.nativeElement.querySelector('td:nth-of-type(2)');
    expect(content.textContent.trim()).toBe('--');

    delete component.data.facts;
    fixture.detectChanges();
    tick();

    content = fixture.nativeElement.querySelector('td:nth-of-type(2)');
    expect(content.textContent.trim()).toBe('--');
  }));

  it('should show tags column', fakeAsync(() => {
    spyOn(component, 'onFilter');
    const content = fixture.nativeElement.querySelectorAll('td:nth-of-type(3) > span');
    const nodeTags = nodeObj.tags.map(t => t.name);

    expect(nodeTags.length).toEqual(content.length);
    for (const element of content) {
      expect(nodeTags).toContain(element.textContent.trim());

      element.click();
      tick();

      expect(component.onFilter).toHaveBeenCalledWith(element.textContent.trim());
    }
  }));

  it('should show facts column', () => {
    const content = fixture.nativeElement.querySelector('td:nth-of-type(4)');

    expect(content.textContent.trim()).toEqual(Object.keys(nodeObj.facts).length.toString());
  });

  it('should show null facts column', fakeAsync(() => {
    component.data.facts = {};
    fixture.detectChanges();
    tick();
    const content = fixture.nativeElement.querySelector('td:nth-of-type(4)');

    expect(content.textContent.trim()).toEqual('0');
  }));

  it('should show metadata column', () => {
    const content = fixture.nativeElement.querySelector('td:nth-of-type(5)');

    expect(content.textContent.trim()).toEqual(Object.keys(nodeObj.metadata).length.toString());
  });

  it('should show null metadata column', fakeAsync(() => {
    component.data.metadata = {};
    fixture.detectChanges();
    tick();
    const content = fixture.nativeElement.querySelector('td:nth-of-type(5)');

    expect(content.textContent.trim()).toEqual('0');
  }));

  it('should filter by installed policy', fakeAsync(() => {
    spyOn(component, 'onFilter');
    const policyBlock = fixture.nativeElement.querySelector('td:nth-of-type(6) > div:nth-of-type(1) > code');
    const stateBlock = fixture.nativeElement.querySelector('td:nth-of-type(6) > div:nth-of-type(2) > code');

    policyBlock.click();
    tick();
    expect(component.onFilter).toHaveBeenCalledWith(nodeObj.policy.name);

    stateBlock.click();
    tick();
    expect(component.onFilter).toHaveBeenCalledWith(nodeObj.state.installed);
  }));

  it('should show state column', () => {
    const content = fixture.nativeElement.querySelector('td:nth-of-type(6)');

    expect(content.textContent.trim()).toMatch(new RegExp(`Installed:\\s+${nodeObj.state.installed}`));
    expect(content.textContent.trim()).toMatch(new RegExp(`Policy:\\s+${nodeObj.policy.name}`));
  });

  it('should show null state column', fakeAsync(() => {
    component.data.state.installed = false;
    delete component.data.policy;
    fixture.detectChanges();
    tick();
    const content = fixture.nativeElement.querySelector('td:nth-of-type(6)');

    expect(content.textContent.trim()).toMatch(new RegExp(`Installed:\\s+no-policy`));
    expect(content.textContent.trim()).toMatch(new RegExp(`Policy:\\s+no-policy`));
  }));

  it('should show last checkin column', () => {
    const content = fixture.nativeElement.querySelector('td:nth-of-type(7)');
    const date = new DatePipe('en');

    expect(content.textContent.trim()).toEqual(date.transform(nodeObj.last_checkin, 'y-MM-dd hh:mm:ss'));
  });

  it('should show actions column', fakeAsync(() => {
    spyOn(component, 'openReinstallModal');
    const anchors = fixture.nativeElement.querySelectorAll('td:nth-of-type(8) > div > a');
    const buttons = fixture.nativeElement.querySelectorAll('td:nth-of-type(8) > div > button');

    expect(anchors.length).toBe(2);
    expect(buttons.length).toBe(1);

    // First buttons are anchors as they have router information

    // Anchor 0 is node details
    expect(anchors[0].href).toMatch(new RegExp(`/${nodeObj.name}$`));

    // Anchor 1 is node logs
    expect(anchors[1].href).toMatch(new RegExp(`/${nodeObj.name}/log$`));

    // Button 0 is node reinstall
    buttons[0].click();
    tick();
    expect(component.openReinstallModal).toHaveBeenCalled();
  }));

  it('should disable reinstall button', fakeAsync(() => {
    spyOn(component, 'openReinstallModal');
    component.data.state.installed = false;
    tick();
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('td:nth-of-type(8) > div > button');

    expect(button.disabled).toBeTruthy();
  }));

  it('should emit onFilter value', () => {
    spyOn(component.filter, 'emit');
    component.onFilter('test-emitted-value');

    expect(component.filter.emit).toHaveBeenCalledWith('test-emitted-value');
  });

  it('should reinstall node keepPolicy', fakeAsync(() => {
    spyOn(ngbModal, 'open').and.returnValue(mockModalOnRef as any);

    const button = fixture.nativeElement.querySelector('td:nth-of-type(8) > div > button');
    button.click();
    tick(Infinity);
    const apiRequest = razorApiStub.getLastRequest();

    expect(ngbModal.open).toHaveBeenCalledWith(NodeReinstallModalComponent);
    expect(apiRequest.id).toEqual(nodeObj.name);
    expect(apiRequest.keepPolicy).toBeTruthy(); // Default is false
  }));

  it('should reinstall node no-keepPolicy', fakeAsync(() => {
    spyOn(ngbModal, 'open').and.returnValue(mockModalOffRef as any);

    const button = fixture.nativeElement.querySelector('td:nth-of-type(8) > div > button');
    button.click();
    tick(Infinity);
    const apiRequest = razorApiStub.getLastRequest();

    expect(ngbModal.open).toHaveBeenCalledWith(NodeReinstallModalComponent);
    expect(apiRequest.id).toEqual(nodeObj.name);
    expect(apiRequest.keepPolicy).toBeFalsy(); // Default is false
  }));
});
