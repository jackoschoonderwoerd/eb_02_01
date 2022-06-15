import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OpeningHoursStore } from 'src/app/shared/stores/opening-hours.store';
import { UiStore } from 'src/app/shared/stores/ui.store';
import { AvailableOutsideDialogComponent } from '../food/available-outside-dialog/available-outside-dialog.component';

export interface Links {
	nl: string;
	uk: string;
}

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


	// language$: Observable<string>
	menuItems: Links[] = [
		{ uk: 'drinks', nl: 'dranken' },
		{ uk: 'lunch', nl: 'lunch' },
		{ uk: 'dinner', nl: 'diner' },
		{ uk: 'snacks', nl: 'snacks' },
		{ uk: 'beers', nl: 'bieren' },
		{ uk: 'exhibitions', nl: 'exposities' }
	]

	constructor(
		public uiStore: UiStore,
		public openingHoursStore: OpeningHoursStore,
		private router: Router,
		private dialog: MatDialog

	) { }

	ngOnInit(): void {
		// this.language$ = this.uiStore.language$
	}
	onLinkSelected(link) {
		console.log(link)
		if (link === 'lunch' || link === 'snacks') {
			this.router.navigate(['/food'], { queryParams: { mealType: link } })
		} else if (link === 'dinner') {
			this.router.navigate(['/food'], { queryParams: { mealType: link } });
			this.dialog.open(AvailableOutsideDialogComponent, {
				panelClass: 'beer-info-dialog',
				width: '310px'
			});
		} else {
			this.router.navigate([link])
		}
	}
}
