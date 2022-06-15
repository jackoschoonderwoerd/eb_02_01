import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthStore } from 'src/app/auth/auth.store';
import { OrderDialogComponent } from 'src/app/order/order-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { OrderStore } from 'src/app/shared/stores/order.store';
import { UiStore } from 'src/app/shared/stores/ui.store';
import { AddBeerDialogComponent } from '../add-beer-dialog/add-beer-dialog.component';
import { Beer, OrderedBeer } from '../beer.model';
import { BeersService } from '../beers.service';
import { BeerInfoDialogComponent } from './beer-info-dialog/beer-info-dialog.component';

@Component({
	selector: 'app-beer',
	templateUrl: './beer.component.html',
	styleUrls: ['./beer.component.scss']
})
export class BeerComponent implements OnInit {

	constructor(
		public uiStore: UiStore,
		public authStore: AuthStore,
		private dialog: MatDialog,
		private beerService: BeersService,
		private orderStore: OrderStore

	) { }

	@Input() public beer: Beer

	ngOnInit(): void {
		// console.log(this.beer)
	}

	onInfo() {
		this.dialog.open(BeerInfoDialogComponent, {
			data: {
				beer: this.beer
			},
			panelClass: 'beer-info-dialog',
			width: '310px',

		})
	}

	onEdit(beer: Beer) {
		const dialogRef = this.dialog.open(AddBeerDialogComponent, {
			data: {
				beer
			}
		})
		dialogRef.afterClosed().subscribe((beer: Beer) => {
			if (beer) {
				beer.id = this.beer.id
				this.beerService.editBeer(beer)
					.then(() => console.log('success'))
					.catch(err => console.log(err));
			} else {
				return
			}
		})

	}
	onDelete() {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			data: {
				name: this.beer.name
			}
		})
		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.beerService.deleteBeer(this.beer.id);
			}
		})
	}
	onOrder() {
		// console.log(this.beer)
		const orderedBeer: OrderedBeer = {
			beer: this.beer,
			amount: 1
		}
		this.orderStore.addBeerToOrder(orderedBeer)
		this.dialog.open(OrderDialogComponent, {
			maxWidth: '100vw',
			maxHeight: '100vh',
			height: '100%',
			width: '100%',
			panelClass: 'full-screen'
		})
	}
}	
