import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOperatorsDetailComponent } from './purchase-operators-detail.component';

describe('PurchaseOperatorsDetailComponent', () => {
  let component: PurchaseOperatorsDetailComponent;
  let fixture: ComponentFixture<PurchaseOperatorsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOperatorsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOperatorsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
