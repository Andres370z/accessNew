import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VigilantFormComponent } from './vigilant-form.component';

describe('VigilantFormComponent', () => {
  let component: VigilantFormComponent;
  let fixture: ComponentFixture<VigilantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VigilantFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VigilantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
