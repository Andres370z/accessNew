import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogBooksComponent } from './log-books.component';

describe('LogBooksComponent', () => {
  let component: LogBooksComponent;
  let fixture: ComponentFixture<LogBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
