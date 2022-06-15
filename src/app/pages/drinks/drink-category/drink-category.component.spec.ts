import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkCategoryComponent } from './drink-category.component';

describe('DrinkCategoryComponent', () => {
  let component: DrinkCategoryComponent;
  let fixture: ComponentFixture<DrinkCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrinkCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
