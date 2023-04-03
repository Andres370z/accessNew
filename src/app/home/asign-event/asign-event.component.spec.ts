import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignEventComponent } from './asign-event.component';

describe('AsignEventComponent', () => {
  let component: AsignEventComponent;
  let fixture: ComponentFixture<AsignEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
