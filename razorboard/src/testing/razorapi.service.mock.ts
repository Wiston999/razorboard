import { nodeListResponse } from './apiresponse.model.mocks';

import { ReplaySubject } from 'rxjs';

export class RazorapiServiceMock {

	getNodes() {
    const subject = new ReplaySubject();
    subject.next(nodeListResponse);
    return subject;
	}

	getNode(id: string) {
    console.log('RazorapiServiceMock::getNode', id);
    const subject = new ReplaySubject();
    subject.next(nodeListResponse[0]);
    return subject;
	}

}
