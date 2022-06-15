import { TestBed } from '@angular/core/testing';

import { InsideStore } from './inside.store';

describe('insideStore', () => {
	let service: InsideStore;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(InsideStore);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
