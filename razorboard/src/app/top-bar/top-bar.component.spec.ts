import { fakeAsync, async, tick, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RazorapiServiceStub } from '../../testing/razorapi.service.stub';

import { RazorapiService } from '../razorapi.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TopBarComponent } from './top-bar.component';

export class MockNgbModalRef {
  result: Promise<any>;

  constructor(value: string) {
    this.result = new Promise((resolve, reject) => resolve(value));
  }

  componentInstance = {
  };
}

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  let ngbModal: NgbModal;
  let razorApiStub: RazorapiServiceStub;
  const saveMockModalRef: MockNgbModalRef = new MockNgbModalRef('save');
  const cancelMockModalRef: MockNgbModalRef = new MockNgbModalRef('cancel');

  beforeEach(async(() => {
    razorApiStub = new RazorapiServiceStub();

    TestBed.configureTestingModule({
      declarations: [ TopBarComponent ],
      imports: [
        FormsModule,
        RouterTestingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientModule,
      ],
      providers: [
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    ngbModal = TestBed.get(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal save', fakeAsync(() => {
    spyOn(ngbModal, 'open').and.returnValue(saveMockModalRef as any);
    spyOn(component.razorapiService, 'connect');

    const button = fixture.nativeElement.querySelector('#settings-btn');
    button.click();
    tick(Infinity);

    expect(ngbModal.open).toHaveBeenCalled();
    // expect(component.razorapiService.connect).toHaveBeenCalled();
  }));

  it('should open modal cancel', fakeAsync(() => {
    spyOn(ngbModal, 'open').and.returnValue(cancelMockModalRef as any);
    spyOn(component.razorapiService, 'connect');

    const button = fixture.nativeElement.querySelector('#settings-btn');
    button.click();
    tick(Infinity);

    expect(ngbModal.open).toHaveBeenCalled();
    expect(component.razorapiService.connect).toHaveBeenCalledTimes(0);
  }));

  it('should switch refresh status', () => {
    spyOn(component.razorapiService, 'setRefreshEnabled');
    component.switchRefresh(true);
    expect(component.razorapiService.setRefreshEnabled).toHaveBeenCalledWith(false);
    component.switchRefresh(false);
    expect(component.razorapiService.setRefreshEnabled).toHaveBeenCalledWith(true);
  });

  it('should show resume button', fakeAsync(() => {
    component.razorapiService.setRefreshEnabled(false);
    tick();
    fixture.detectChanges();
    const pause = fixture.nativeElement.querySelector('#pause-refresh-btn');
    const resume = fixture.nativeElement.querySelector('#resume-refresh-btn');
    expect(resume).toBeTruthy();
    expect(pause).toBeFalsy();
  }));

  it('should show pause button', fakeAsync(() => {
    component.razorapiService.setRefreshEnabled(true);
    tick();
    fixture.detectChanges();
    const pause = fixture.nativeElement.querySelector('#pause-refresh-btn');
    const resume = fixture.nativeElement.querySelector('#resume-refresh-btn');
    expect(pause).toBeTruthy();
    expect(resume).toBeFalsy();
  }));
});
