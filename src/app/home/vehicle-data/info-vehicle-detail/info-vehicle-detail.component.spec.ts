import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVehicleDetailComponent } from './info-vehicle-detail.component';

describe('InfoVehicleDetailComponent', () => {
  let component: InfoVehicleDetailComponent;
  let fixture: ComponentFixture<InfoVehicleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoVehicleDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoVehicleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
