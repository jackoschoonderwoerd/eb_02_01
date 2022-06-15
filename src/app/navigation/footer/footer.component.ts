import { Component, OnInit } from '@angular/core';
import { OpeningHoursStore } from 'src/app/shared/stores/opening-hours.store';
import { UiStore } from 'src/app/shared/stores/ui.store';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	constructor(
		public uiStore: UiStore,
		public openingHoursStore: OpeningHoursStore
	) { }

	ngOnInit(): void {
	}

}
