import { TestBed } from '@angular/core/testing';

import { ColorTagService } from './color-tag.service';

describe('ColorTagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorTagService = TestBed.get(ColorTagService);
    expect(service).toBeTruthy();
  });
});
