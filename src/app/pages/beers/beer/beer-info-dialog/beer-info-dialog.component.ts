import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Beer } from '../../beer.model';

@Component({
	selector: 'app-beer-info-dialog',
	templateUrl: './beer-info-dialog.component.html',
	styleUrls: ['./beer-info-dialog.component.scss']
})
export class BeerInfoDialogComponent implements OnInit {

	beer: Beer

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: any
	) { }

	ngOnInit(): void {
		if (this.data) {
			this.beer = this.data.beer
		}
	}
}
