import { TestBed } from '@angular/core/testing';

import { GisObjectMetaDataService } from './gis-object-meta-data.service';

describe('GisObjectMetaDataService', () => {
  let service: GisObjectMetaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GisObjectMetaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
