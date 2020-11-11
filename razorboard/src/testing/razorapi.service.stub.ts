import { nodeListResponse, nodeLogResponse } from './apiresponse.model.mock';

import { Observable, ReplaySubject, of } from 'rxjs';

export class RazorapiServiceStub {

  private requests = [];

  reload$ = new Observable();

  getNodes() {
    const subject = new ReplaySubject();
    subject.next(nodeListResponse);
    return subject;
  }

  getNode(id: string) {
    const subject = new ReplaySubject();
    const nodeObjs = nodeListResponse.items.filter(n => n.name === id);
    subject.next(nodeObjs[0]);
    return subject;
  }

  getNodeLogs(id: string) {
    const subject = new ReplaySubject();
    subject.next(nodeLogResponse);
    return subject;
  }

  modifyNodeMetadata(id: string, update: {string: any}, remove: string[]) {
    this.requests.push({id, update, remove});
    return of(true);
  }

  reinstallNode(id: string, keepPolicy: boolean) {
    this.requests.push({id, keepPolicy});
    return of(true);
  }

  // Testing utils
  getRequests() {
    return this.requests;
  }

  getLastRequest() {
    return this.requests[this.requests.length - 1];
  }
}
