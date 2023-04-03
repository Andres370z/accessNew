import { TestBed } from '@angular/core/testing';

import { CompanyResgistrationService } from './company-resgistration.service';

describe('CompanyResgistrationService', () => {
  let service: CompanyResgistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyResgistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
