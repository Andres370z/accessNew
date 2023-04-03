import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceRationsComponent } from './balance-rations.component';

describe('BalanceRationsComponent', () => {
  let component: BalanceRationsComponent;
  let fixture: ComponentFixture<BalanceRationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceRationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceRationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
