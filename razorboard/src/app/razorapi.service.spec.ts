import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';

import { LocalStorageStub } from '../testing/local-storage.stub';

import { RazorapiService } from './razorapi.service';

// This object is tests with and without auth header, to test a new
// function, use as key the collection name and value the function implemented
const collections = {
  nodes: (svc) => svc.getNodes(),
  hooks: (svc) => svc.getHooks(),
  policies: (svc) => svc.getPolicies(),
  tags: (svc) => svc.getTags(),
  tasks: (svc) => svc.getTasks(),
  events: (svc) => svc.getEvents(),
  brokers: (svc) => svc.getBrokers(),
  repos: (svc) => svc.getRepos(),
  commands: (svc) => svc.getCommands(),
  config: (svc) => svc.getConfiguration(),
  'nodes\\/node1': (svc) => svc.getNode('node1'),
  'nodes\\/node1\\/log': (svc) => svc.getNodeLogs('node1'),
};

const commandCases = {
  'reinstall-node-keep': {
    command: 'reinstall-node',
    req: (svc) => svc.reinstallNode('node1', true),
    check: (req) => {
      expect(req.body.name).toEqual('node1');
      expect(req.body.same_policy).toBeTruthy();
    },
  },
  'reinstall-node-no-keep': {
    command: 'reinstall-node',
    req: (svc) => svc.reinstallNode('node1', false),
    check: (req) => {
      expect(req.body.name).toEqual('node1');
      expect(req.body.same_policy).toBeFalsy();
    },
  },
  'modify-metadata-full-data': {
    command: 'modify-node-metadata',
    req: (svc) => svc.modifyNodeMetadata('node1', {key1: 'value'}, ['key2']),
    check: (req) => {
      expect(req.body.node).toEqual('node1');
      expect(req.body.update.key1).toEqual('value');
      expect(req.body.remove.length).toEqual(1);
      expect(req.body.remove[0]).toEqual('key2');
    },
  },
  'modify-metadata-no-remove': {
    command: 'modify-node-metadata',
    req: (svc) => svc.modifyNodeMetadata('node1', {key1: 'value'}, []),
    check: (req) => {
      expect(req.body.node).toEqual('node1');
      expect(req.body.update.key1).toEqual('value');
      expect(req.body.remove.length).toEqual(0);
    },
  },
  'modify-metadata-no-update': {
    command: 'modify-node-metadata',
    req: (svc) => svc.modifyNodeMetadata('node1', {}, ['key2']),
    check: (req) => {
      expect(req.body.node).toEqual('node1');
      expect(Object.keys(req.body.update).length).toEqual(0);
      expect(req.body.remove.length).toEqual(1);
      expect(req.body.remove[0]).toEqual('key2');
    },
  },
};

describe('RazorapiService', () => {
  let service: RazorapiService;
  let localStorageStub: LocalStorageStub;
  let httpMock: HttpTestingController;

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
    httpMock = TestBed.get(HttpTestingController);
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

  Object.keys(collections).forEach((key) => {
    it(`should get collection ${key} without AUTH`, fakeAsync(() => {
      service.connect('http://localhost', '', '', 100, false);
      collections[key](service).subscribe(response => {
        expect(response).toBeTruthy();
      }).unsubscribe();
      tick();

      const httpRequest = httpMock.match((req) => new RegExp(`api\/collections\/${key}?.+`).test(req.url))[0];
      expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
    }));

    it(`should get collection ${key} with AUTH`, fakeAsync(() => {
      const header = 'Basic dGVzdC11c2VyOnRlc3QtcHdk';
      service.connect('http://localhost', 'test-user', 'test-pwd', 100, false);
      collections[key](service).subscribe(response => {
        expect(response).toBeTruthy();
      }).unsubscribe();
      tick();

      const httpRequest = httpMock.match((req) => new RegExp(`api\/collections\/${key}?.+`).test(req.url))[0];
      expect(httpRequest.request.headers.get('Authorization')).toEqual(header);
    }));
  });

  Object.keys(commandCases).forEach((key) => {
    it(`should send command ${key} without AUTH`, fakeAsync(() => {
      const reqInfo = commandCases[key];
      service.connect('http://localhost', '', '', 100, false);
      reqInfo.req(service).subscribe(response => {
        expect(response).toBeTruthy();
      }).unsubscribe();
      tick();

      const httpRequest = httpMock.match((req) => new RegExp(`api\/commands\/${reqInfo.command}?.+`).test(req.url))[0];
      expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
      reqInfo.check(httpRequest.request);
    }));

    it(`should send command ${key} with AUTH`, fakeAsync(() => {
      const reqInfo = commandCases[key];
      const header = 'Basic dGVzdC11c2VyOnRlc3QtcHdk';
      service.connect('http://localhost', 'test-user', 'test-pwd', 100, false);
      reqInfo.req(service).subscribe(response => {
        expect(response).toBeTruthy();
      }).unsubscribe();
      tick();

      const httpRequest = httpMock.match((req) => new RegExp(`api\/commands\/${reqInfo.command}?.+`).test(req.url))[0];
      expect(httpRequest.request.headers.get('Authorization')).toEqual(header);
      reqInfo.check(httpRequest.request);
    }));
  });
});
