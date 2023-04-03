import { TestBed } from '@angular/core/testing';

import { VigilantFormService } from './vigilant-form.service';

describe('VigilantFormService', () => {
  let service: VigilantFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VigilantFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
