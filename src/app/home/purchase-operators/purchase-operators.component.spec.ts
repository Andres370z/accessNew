import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOperatorsComponent } from './purchase-operators.component';

describe('PurchaseOperatorsComponent', () => {
  let component: PurchaseOperatorsComponent;
  let fixture: ComponentFixture<PurchaseOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOperatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
