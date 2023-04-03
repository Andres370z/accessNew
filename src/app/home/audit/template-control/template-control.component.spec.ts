import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateControlComponent } from './template-control.component';

describe('TemplateControlComponent', () => {
  let component: TemplateControlComponent;
  let fixture: ComponentFixture<TemplateControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
