import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';

import { AddBeerDialogComponent } from './add-beer-dialog/add-beer-dialog.component';
import { Beer } from './beer.model';
import { BeersService } from './beers.service';
import { sortBySeqNo } from './beer.model';
import { AuthStore } from 'src/app/auth/auth.store';
import { UiStore } from 'src/app/shared/stores/ui.store';
import { OpeningHoursStore } from 'src/app/shared/stores/opening-hours.store';

@Component({
	selector: 'app-beers',
	templateUrl: './beers.component.html',
	styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit {


	beers$: Observable<Beer[]>

	constructor(
		private beerService: BeersService,
		private dialog: MatDialog,
		public authStore: AuthStore,
		public uiStore: UiStore,
		public openingHoursStore: OpeningHoursStore
	) { }

	ngOnInit(): void {
		const targetElement = document.getElementById('top-page');
		targetElement.scrollIntoView();
		this.beers$ = this.beerService.getAllBeers()
			.pipe(
				map(
					beers => beers.sort(sortBySeqNo)
				)
			)

	}
	onAddBeer() {
		const dialogRef = this.dialog.open(AddBeerDialogComponent, {

		})
		dialogRef.afterClosed().subscribe((beer: Beer) => {
			this.beerService.addBeer(beer)
		})
	}

}
