import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDrinkDialogComponent } from './order-drink-dialog.component';

describe('OrderDrinkDialogComponent', () => {
  let component: OrderDrinkDialogComponent;
  let fixture: ComponentFixture<OrderDrinkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDrinkDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDrinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
