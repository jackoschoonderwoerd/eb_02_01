import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableOutsideDialogComponent } from './available-outside-dialog.component';

describe('AvailableOutsideDialogComponent', () => {
  let component: AvailableOutsideDialogComponent;
  let fixture: ComponentFixture<AvailableOutsideDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableOutsideDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableOutsideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
