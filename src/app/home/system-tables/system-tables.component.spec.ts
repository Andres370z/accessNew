import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemTablesComponent } from './system-tables.component';

describe('SystemTablesComponent', () => {
  let component: SystemTablesComponent;
  let fixture: ComponentFixture<SystemTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
