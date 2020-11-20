import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HttpEventsService } from './http-events.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { AppComponent } from './app.component';

import { HttpEventsServiceStub } from '../testing/http-events.service.stub';

export class MockNgbModalRef {
  result: Promise<any>;

  constructor(value: string) {
    this.result = new Promise((resolve, reject) => resolve(value));
  }

  componentInstance = {
    title: 'razorboard',
    errMsg: '',
  };
}

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let ngbModal: NgbModal;
  let httpEventsStub: HttpEventsServiceStub;
  const mockModalRef: MockNgbModalRef = new MockNgbModalRef('save');

  beforeEach(async(() => {
    httpEventsStub = new HttpEventsServiceStub();
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SettingsModalComponent,
        TopBarComponent,
      ],
      imports: [
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FontAwesomeModule,
        HttpClientModule,
      ],
      providers: [
        { provide: HttpEventsService, useValue: httpEventsStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    ngbModal = TestBed.get(NgbModal);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'RazorBoard'`, () => {
    expect(app.title).toEqual('RazorBoard');
  });

  it('should open settings modal', fakeAsync(() => {
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef as any);

    app.openSettingsModal(0);
    tick(Infinity);

    expect(ngbModal.open).toHaveBeenCalled();
    expect(mockModalRef.componentInstance.errMsg).toBeTruthy();
  }));

  it('should open settings modal (Unauthorized)', fakeAsync(() => {
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef as any);

    app.openSettingsModal(401);
    tick(Infinity);

    expect(ngbModal.open).toHaveBeenCalled();
    expect(mockModalRef.componentInstance.errMsg).toMatch(/^Unauthorized/);
  }));

  it('should open settings modal on error 0 or 4XX', fakeAsync(() => {
    // spyOn(app.modalService, 'open').and.returnValue(mockModalRef as any); // Needed to avoid test error
    spyOn(app, 'openSettingsModal');

    const statuses = [0, 400, 401, 402, 403, 404, 405];
    statuses.forEach((v, i) => {
      httpEventsStub.status$.next(v);

      tick();

      expect(app.openSettingsModal).toHaveBeenCalledWith(v);
    });
    expect(app.openSettingsModal).toHaveBeenCalledTimes(statuses.length);
  }));

  it('should not open settings modal other error', fakeAsync(() => {
    spyOn(app, 'openSettingsModal');

    const statuses = [1, 399, 500];
    statuses.forEach((v, i) => {
      httpEventsStub.status$.next(v);
      tick();
    });
    expect(app.openSettingsModal).toHaveBeenCalledTimes(0);
  }));
});
