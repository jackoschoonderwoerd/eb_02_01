import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrinkDialogComponent } from './add-drink-dialog.component';

describe('AddDrinkDialogComponent', () => {
  let component: AddDrinkDialogComponent;
  let fixture: ComponentFixture<AddDrinkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDrinkDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDrinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
