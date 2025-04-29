import { TestBed } from '@angular/core/testing';

import { MoonSocketService } from './moon-socket.service';

describe('MoonSocketService', () => {
  let service: MoonSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoonSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
