import { TestBed } from '@angular/core/testing';

import { MapAddressSService } from './map-address-s.service';

describe('MapAddressSService', () => {
  let service: MapAddressSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapAddressSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
