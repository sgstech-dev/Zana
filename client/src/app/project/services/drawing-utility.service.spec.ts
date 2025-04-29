import { TestBed } from '@angular/core/testing';

import { DrawingUtilityService } from './drawing-utility.service';

describe('DrawingUtilityService', () => {
  let service: DrawingUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawingUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
