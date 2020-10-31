import { nodeListResponse } from './apiresponse.model.mock';

import { Observable, ReplaySubject, of } from 'rxjs';

export class RazorapiServiceStub {

  reload$ = new Observable();

	getNodes() {
    const subject = new ReplaySubject();
    subject.next(nodeListResponse);
    return subject;
	}

	getNode(id: string) {
    const subject = new ReplaySubject();
    const nodeObjs = nodeListResponse.items.filter(n => n.name === id)
    subject.next(nodeObjs[0]);
    return subject;
	}
}
