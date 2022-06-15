import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBeingProcessedComponent } from './order-being-processed.component';

describe('OrderBeingProcessedComponent', () => {
  let component: OrderBeingProcessedComponent;
  let fixture: ComponentFixture<OrderBeingProcessedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBeingProcessedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBeingProcessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
