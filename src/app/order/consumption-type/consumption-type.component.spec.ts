import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionTypeComponent } from './consumption-type.component';

describe('ConsumptionTypeComponent', () => {
  let component: ConsumptionTypeComponent;
  let fixture: ComponentFixture<ConsumptionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumptionTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
