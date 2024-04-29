import { TestBed } from '@angular/core/testing';

import { LogBooksService } from './log-books.service';

describe('LogBooksService', () => {
  let service: LogBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
