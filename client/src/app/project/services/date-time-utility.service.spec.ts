import { TestBed } from '@angular/core/testing';

import { DateTimeUtilityService } from './date-time-utility.service';

describe('DateTimeUtilityService', () => {
  let service: DateTimeUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateTimeUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
