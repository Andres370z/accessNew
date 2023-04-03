import { TestBed } from '@angular/core/testing';

import { PointAccessService } from './point-access.service';

describe('PointAccessService', () => {
  let service: PointAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
