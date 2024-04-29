import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingMinuteComponent } from './closing-minute.component';

describe('ClosingMinuteComponent', () => {
  let component: ClosingMinuteComponent;
  let fixture: ComponentFixture<ClosingMinuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosingMinuteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosingMinuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
