import { TestBed } from '@angular/core/testing';

import { PpiUtilityService } from './ppi-utility.service';

describe('PpiUtilityService', () => {
  let service: PpiUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpiUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
