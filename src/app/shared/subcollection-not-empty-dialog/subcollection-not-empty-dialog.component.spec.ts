import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcollectionNotEmptyDialogComponent } from './subcollection-not-empty-dialog.component';

describe('SubcollectionNotEmptyDialogComponent', () => {
  let component: SubcollectionNotEmptyDialogComponent;
  let fixture: ComponentFixture<SubcollectionNotEmptyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcollectionNotEmptyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcollectionNotEmptyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
