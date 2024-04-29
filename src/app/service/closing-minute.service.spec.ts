import { TestBed } from '@angular/core/testing';

import { ClosingMinuteService } from './closing-minute.service';

describe('ClosingMinuteService', () => {
  let service: ClosingMinuteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClosingMinuteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
