import { TestBed } from '@angular/core/testing';

import { GisObjectService } from './gis-object.service';

describe('GisObjectService', () => {
  let service: GisObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GisObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
