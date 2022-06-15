import { TestBed } from '@angular/core/testing';

import { OpeningHoursStore } from './opening-hours.store';

describe('OpeningHoursStore', () => {
  let service: OpeningHoursStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpeningHoursStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
