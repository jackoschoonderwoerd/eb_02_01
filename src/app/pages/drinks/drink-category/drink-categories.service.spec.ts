import { TestBed } from '@angular/core/testing';

import { DrinkCategoriesService } from './drink-categories.service';

describe('DrinkCategoriesService', () => {
  let service: DrinkCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrinkCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
