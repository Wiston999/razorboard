import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';

import { LocalStorageStub } from '../testing/local-storage.stub';

import { RazorapiService } from './razorapi.service';

describe('RazorapiService', () => {
  let service: RazorapiService;
  let localStorageStub: LocalStorageStub;

  beforeEach(() => {
    localStorageStub = new LocalStorageStub();
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        RazorapiService,
        { provide: LOCAL_STORAGE, useValue: localStorageStub },
      ],
    });
    localStorageStub.clear();
    service = TestBed.get(RazorapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getSetting', () => {
    const value = 'test-local-value';
    expect(service.getSetting('key', value)).toEqual(value);
    localStorageStub.set('key', `local${value}`);
    expect(service.getSetting('key', value)).toEqual(`local${value}`);
  });

  it('should setSetting', () => {
    const value = 'test-local-value';
    localStorageStub.set('key', `a ${value}`);
    expect(service.setSetting('key', value)).toBeTruthy();
    expect(service.setSetting('key', value)).toBeFalsy();
  });

  it('should connect and reload', fakeAsync(() => {
    expect(service.connect('a', 'b', 'c', 100, false)).toBeTruthy();
    tick();
    expect(service.getEndpoint()).toEqual('a');
    expect(service.getUsername()).toEqual('b');
    expect(service.getPassword()).toEqual('c');
    expect(service.getRefresh()).toBe(100);
    expect(service.getRefreshEnabled()).toEqual(false);
    expect(service.connect('d', 'b', 'c', 100, false)).toBeTruthy();
    expect(service.connect('d', 'e', 'c', 100, false)).toBeTruthy();
    expect(service.connect('d', 'e', 'f', 100, false)).toBeTruthy();
    expect(service.connect('d', 'e', 'f', 100, true)).toBeTruthy();
  }));

  it('should connect and not reload', fakeAsync(() => {
    service.connect(service.getEndpoint(), '', '', 100000, true);
    expect(service.connect(service.getEndpoint(), '', '', 100000, true)).toBeFalsy();
  }));
});
