import { TestBed } from '@angular/core/testing';

import { CreateAgentsService } from './create-agents.service';

describe('CreateAgentsService', () => {
  let service: CreateAgentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAgentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
