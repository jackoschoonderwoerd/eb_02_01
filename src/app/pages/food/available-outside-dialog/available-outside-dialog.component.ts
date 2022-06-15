import { Component, OnInit } from '@angular/core';
import { InsideStore } from 'src/app/shared/stores/inside.store';
import { UiStore } from 'src/app/shared/stores/ui.store';

@Component({
	selector: 'app-available-outside-dialog',
	templateUrl: './available-outside-dialog.component.html',
	styleUrls: ['./available-outside-dialog.component.scss']
})
export class AvailableOutsideDialogComponent implements OnInit {

	constructor(
		public uiStore: UiStore,
		public insideStore: InsideStore
	) { }

	ngOnInit(): void {
	}
	setAvailability(inside: boolean) {
		this.insideStore.setInside(inside);

	}
	onChangeLanguage(language: string) {
		this.uiStore.changeLanguage(language);
	}
}
