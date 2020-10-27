import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { RazorapiService } from './razorapi.service';

describe('RazorapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ RazorapiService ],
  }));

  it('should be created', () => {
    const service: RazorapiService = TestBed.get(RazorapiService);
    expect(service).toBeTruthy();
  });
});
