import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeerDialogComponent } from './add-beer-dialog.component';

describe('AddBeerDialogComponent', () => {
  let component: AddBeerDialogComponent;
  let fixture: ComponentFixture<AddBeerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBeerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBeerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
