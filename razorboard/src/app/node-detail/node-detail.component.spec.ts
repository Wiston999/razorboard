import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, async, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { RazorapiServiceStub } from '../../testing/razorapi.service.stub';
import { nodeList } from '../../testing/apiresponse.model.mock';

import { RazorapiService } from '../razorapi.service';
import { MacAddrPipe } from '../mac-addr.pipe';
import { FactsFilterPipe } from './facts-filter.pipe';
import { NodeReinstallModalComponent } from '../node-reinstall-modal/node-reinstall-modal.component';
import { NodeDetailComponent } from './node-detail.component';

export class MockNgbModalONRef {
  componentInstance = {
    nodeId: undefined,
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve('on'));
}

export class MockNgbModalOFFRef {
  componentInstance = {
    nodeId: undefined,
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve('off'));
}

describe('NodeDetailComponent', () => {
  let component: NodeDetailComponent;
  let fixture: ComponentFixture<NodeDetailComponent>;
  let routeStub: ActivatedRouteStub;
  let razorApiStub: RazorapiServiceStub;
  let titleService: Title;
  let ngbModal: NgbModal;
  const mockModalOnRef: MockNgbModalONRef = new MockNgbModalONRef();
  const mockModalOffRef: MockNgbModalOFFRef = new MockNgbModalOFFRef();
  const nodeObj = nodeList[0];

  beforeEach(async(() => {
    routeStub = new ActivatedRouteStub();
    razorApiStub = new RazorapiServiceStub();

    TestBed.configureTestingModule({
      declarations: [
        NodeDetailComponent,
        NodeReinstallModalComponent,
        MacAddrPipe,
        FactsFilterPipe,
      ],
      imports: [
        FormsModule,
        FontAwesomeModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        NodeDetailComponent,
        { provide: RazorapiService, useValue: razorApiStub },
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: Title, useClass: Title },
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
    ngbModal = TestBed.get(NgbModal);
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
    expect(title).toBe(`Node Details - ${nodeObj.name}`);
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

  it('should start edit mode', () => {
    component.editStart();
    fixture.detectChanges();
    const editContent = fixture.nativeElement.querySelectorAll('.metadata-edit');
    expect(component.editMode).toBe(true);
    expect(component.node.metadata).toEqual(component.editNode.metadata);
    expect(editContent.length).toBe(Object.values(component.editNode.metadata).length);
  });

  it('should remove metadata', () => {
    const deletedKey = Object.keys(component.node.metadata)[0];
    component.editStart();
    component.metadataDelete(deletedKey);
    fixture.detectChanges();
    const editContent = fixture.nativeElement.querySelectorAll('.metadata-edit');
    expect(editContent.length).toBe(Object.values(component.editNode.metadata).length);
    expect(component.editNode.metadata[deletedKey]).toBeUndefined();
  });

  it('should add metadata', fakeAsync(() => {
    const currentMetadata = Object.keys(component.node.metadata).length;
    component.editStart();
    component.newMetadataKey = 'zzzzztest-key';
    component.newMetadataValue = 'test-value';
    component.metadataAdd();
    fixture.detectChanges();
    tick();
    const editLabels = fixture.nativeElement.querySelectorAll('.metadata-edit-label');
    const editContent = fixture.nativeElement.querySelectorAll('.metadata-edit');
    let newIndex: number;
    editLabels.forEach((el, i) => {
      if (el.textContent === 'zzzzztest-key') {
        newIndex = i;
      }
    });
    expect(component.editNode.metadata['zzzzztest-key']).toBe('test-value');
    expect(currentMetadata + 1).toBe(Object.values(component.editNode.metadata).length);
    expect(editContent.length).toBe(Object.values(component.editNode.metadata).length);
    expect(editContent[newIndex].value).toBe('test-value');
  }));

  it('should modify metadata', fakeAsync(() => {
    const currentMetadata = Object.keys(component.node.metadata).length;
    const metadataKey = Object.keys(component.node.metadata)[0];
    component.editStart();
    component.metadataChange(metadataKey, 'new-test-value');
    fixture.detectChanges();
    tick();
    const editLabels = fixture.nativeElement.querySelectorAll('.metadata-edit-label');
    const editContent = fixture.nativeElement.querySelectorAll('.metadata-edit');
    let modifiedIndex: number;
    editLabels.forEach((el, i) => {
      if (el.textContent === metadataKey) {
        modifiedIndex = i;
      }
    });
    expect(currentMetadata).toBe(Object.values(component.editNode.metadata).length);
    expect(component.editNode.metadata[metadataKey]).toBe('new-test-value');
    expect(editContent[modifiedIndex].value).toBe('new-test-value');
  }));

  it('should save metadata', () => {
    const modifyKey = Object.keys(component.node.metadata)[0];
    const deleteKey = Object.keys(component.node.metadata)[1];
    component.editStart();
    // Modify metadata
    component.metadataChange(modifyKey, 'new-test-value');
    // Delete metadata
    component.metadataDelete(deleteKey);
    // Add new metadata
    component.newMetadataKey = 'zzzzztest-key';
    component.newMetadataValue = 'test-value';
    component.metadataAdd();
    // Perform save
    component.metadataSave('save');
    fixture.detectChanges();
    const apiRequest = razorApiStub.getLastRequest();
    const updateMap = {'zzzzztest-key': 'test-value'};
    updateMap[modifyKey] = 'new-test-value';
    expect(apiRequest.id).toBe(component.node.name);
    expect(apiRequest.update).toEqual(updateMap);
    expect(apiRequest.remove).toEqual([deleteKey]);
    expect(component.editMode).toBeFalsy();
  });

  it('should not save metadata', () => {
    component.editStart();
    // Perform save
    component.metadataSave('other-than-save');
    fixture.detectChanges();
    expect(razorApiStub.getRequests().length).toBe(0);
  });

  it('should filter facts changed', () => {
    component.filterFactsChanged();
    expect(component.showEmpty).toBeFalsy();
    component.filterFacts = 'test-filter';
    component.filterFactsChanged();
    expect(component.showEmpty).toBeTruthy();
  });

  it('should disable reinstall button', fakeAsync(() => {
    spyOn(component, 'openReinstallModal');
    const otherNodeObj = JSON.parse(JSON.stringify(nodeObj));
    otherNodeObj.state.installed = false;
    component.node = otherNodeObj;
    tick();
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('#reinstall-btn');

    expect(button.disabled).toBeTruthy();
  }));

  it('should reinstall node keepPolicy', fakeAsync(() => {
    spyOn(ngbModal, 'open').and.returnValue(mockModalOnRef as any);

    const button = fixture.nativeElement.querySelector('#reinstall-btn');
    button.click();
    tick(Infinity);
    const apiRequest = razorApiStub.getLastRequest();

    expect(ngbModal.open).toHaveBeenCalledWith(NodeReinstallModalComponent);
    expect(apiRequest.id).toEqual(nodeObj.name);
    expect(apiRequest.keepPolicy).toBeTruthy(); // Default is false
  }));

  it('should reinstall node no-keepPolicy', fakeAsync(() => {
    spyOn(ngbModal, 'open').and.returnValue(mockModalOffRef as any);

    const button = fixture.nativeElement.querySelector('#reinstall-btn');
    button.click();
    tick(Infinity);
    const apiRequest = razorApiStub.getLastRequest();

    expect(ngbModal.open).toHaveBeenCalledWith(NodeReinstallModalComponent);
    expect(apiRequest.id).toEqual(nodeObj.name);
    expect(apiRequest.keepPolicy).toBeFalsy(); // Default is false
  }));
});
