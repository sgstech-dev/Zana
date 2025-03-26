import { TestBed } from '@angular/core/testing';

import { TargetServiceService } from './target-service.service';

describe('TargetServiceService', () => {
  let service: TargetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TargetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
