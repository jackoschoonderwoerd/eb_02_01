import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthStore } from 'src/app/auth/auth.store';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { Drink } from '../../drinks.models';
import { DrinksService } from './drinks.service';
import { AddDrinkDialogComponent } from '../add-drink-dialog/add-drink-dialog.component';
// import { OrderDrinkDialogComponent } from './order-drink-dialog/order-drink-dialog.component';
import { OrderStore } from 'src/app/shared/stores/order.store';
import { UiStore } from 'src/app/shared/stores/ui.store';
import { OrderDialogComponent } from 'src/app/order/order-dialog.component';
import { OrderedDrink } from './order-drink-dialog/order-drink.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-drink',
	templateUrl: './drink.component.html',
	styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit {


	@Input() public drink: Drink
	@Input() private categoryId: string
	// onlineOrdering$ = new Observable<boolean>()
	onLineOrdering$ = new Observable<boolean>();


	constructor(
		public authStore: AuthStore,
		private dialog: MatDialog,
		private drinksService: DrinksService,
		private orderStore: OrderStore,
		public uiStore: UiStore,

	) { }

	ngOnInit(): void {
		// this.uiStore.getOnlineOrdering().subscribe(status => {
		// 	console.log(status);
		// })
		// this.onLineOrdering$ = this.uiStore.onLineOrdering$

	}
	onEditDrink() {
		const dialogRef = this.dialog.open(AddDrinkDialogComponent, {
			data: {
				drink: this.drink
			},
			maxWidth: '100vw',
			maxHeight: '100vh',
			height: '100%',
			width: '100%',
			panelClass: 'full-screen'
		})
		// dialogRef.afterClosed().subscribe((drink: Drink) => {
		// 	this.drinksService.editDrink(this.categoryId, drink)
		// })
	}
	onDeleteDrink() {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			data: {
				name: this.drink.name
			}
		})
		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.drinksService.deleteDrink(this.categoryId, this.drink.id)
					.then(() => { console.log('success') })
					.catch(err => console.log(err));
			}
		})
	}
	orderDrink(drink: Drink) {
		const orderedDrink: OrderedDrink = {
			drink: this.drink,
			amount: 1
		}
		this.orderStore.addDrinkToOrder(orderedDrink)
		const dialogRef = this.dialog.open(OrderDialogComponent, {
			maxWidth: '100vw',
			maxHeight: '100vh',
			height: '100%',
			width: '100%',
			panelClass: 'full-screen'
		});
		dialogRef.afterClosed().subscribe((data) => {
			this.drinksService.passOnAnchor(data)
		});
	}
}
