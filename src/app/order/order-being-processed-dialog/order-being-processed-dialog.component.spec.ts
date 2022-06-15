import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBeingProcessedDialogComponent } from './order-being-processed-dialog.component';

describe('OrderBeingProcessedDialogComponent', () => {
  let component: OrderBeingProcessedDialogComponent;
  let fixture: ComponentFixture<OrderBeingProcessedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBeingProcessedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBeingProcessedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
