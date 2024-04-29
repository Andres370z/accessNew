import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingMinuteDetailComponent } from './closing-minute-detail.component';

describe('ClosingMinuteDetailComponent', () => {
  let component: ClosingMinuteDetailComponent;
  let fixture: ComponentFixture<ClosingMinuteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosingMinuteDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosingMinuteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
