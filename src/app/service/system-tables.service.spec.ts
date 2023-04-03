import { TestBed } from '@angular/core/testing';

import { SystemTablesService } from './system-tables.service';

describe('SystemTablesService', () => {
  let service: SystemTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
