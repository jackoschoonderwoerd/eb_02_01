import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderedBeer } from '../pages/beers/beer.model';
import { DrinksService } from '../pages/drinks/drink-category/drink/drinks.service';
import { OrderedDrink } from '../pages/drinks/drink-category/drink/order-drink-dialog/order-drink.model';
import { Drink } from '../pages/drinks/drinks.models';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { Order, OrderedDish } from '../shared/models/order.model';
import { OrderStore } from '../shared/stores/order.store';
import { UiStore } from '../shared/stores/ui.store';
import { OrderBeingProcessedDialogComponent } from './order-being-processed-dialog/order-being-processed-dialog.component';


export interface OrderedItem {
	name: string;
	price: number;
}

export interface ConsumptionType {
	name: string;
	orderedItems: OrderedItem[]
}

export interface ModifiedOrder {
	consumptionType: ConsumptionType[]
}

@Component({
	selector: 'app-order-dialog',
	templateUrl: './order-dialog.component.html',
	styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {

	drink: Drink
	tableNumberForm: FormGroup
	productPrice: number
	orderedDrinks: OrderedDrink[] = [];
	initialAmount: number = 1
	orderedDrinks$: Observable<OrderedDrink[]>;
	totalPrice$: Observable<number>;
	order$: Observable<Order>
	modifiedOrder: ModifiedOrder
	order: Order


	constructor(
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) private data: any,
		public orderStore: OrderStore,
		private dialog: MatDialog,
		private router: Router,
		public dialogRef: MatDialogRef<OrderDialogComponent>,
		private drinksService: DrinksService,
		public uiStore: UiStore
	) { }


	ngOnInit(): void {
		this.orderStore.getOrder().subscribe(order => console.log(order))
		this.initTableNumberForm();
		this.order$ = this.orderStore.order$;
		this.orderStore.checkLocalStorage();
		this.orderStore.calculateTotal();

	}

	initTableNumberForm() {
		this.tableNumberForm = this.fb.group({
			tableNumber: new FormControl(null, [Validators.required])
		})
	}

	onSubmitTableNumber() {
		console.log(this.tableNumberForm.value);
		this.orderStore.addTablenumberToOrder(this.tableNumberForm.value.tableNumber)
	}
	onAddDishToOrder(orderedDish: OrderedDish) {
		this.orderStore.addDishToOrder(orderedDish)
	}
	onRemoveDishFromOrder(doomedDish: OrderedDish) {
		this.orderStore.removeDishFromOrder(doomedDish)
	}
	onAddMoreSnacks() {
		this.dialog.closeAll();
		this.router.navigateByUrl('food?mealType=snacks')
	}
	onAddMoreLunch() {
		this.dialog.closeAll();
		this.router.navigateByUrl('food?mealType=lunch')
	}
	onAddMoreDinner() {
		this.dialog.closeAll();
		this.router.navigateByUrl('food?mealType=dinner')
	}

	onAddDrinkToOrder(orderedDrink: OrderedDrink) {
		this.orderStore.addDrinkToOrder(orderedDrink);
	}

	onRemoveDrinkFromOrder(orderedDrink: OrderedDrink) {
		this.orderStore.removeDrinkFromOrder(orderedDrink);
	}

	onAddMoreDrinks(anchor) {
		this.router.navigate(['drinks', { drinkType: anchor }])
		setTimeout(() => {
			this.drinksService.anchorEmitter.emit(anchor)
		}, 1000);
		this.dialogRef.close(anchor)
	}

	onAddBeerToOrder(orderedBeer: OrderedBeer) {
		this.orderStore.addBeerToOrder(orderedBeer)
	}
	onRemoveBeerFromOrder(doomedOrderedBeer: OrderedBeer) {
		this.orderStore.removeBeerFromOrder(doomedOrderedBeer)
	}
	onAddMoreBeers() {
		this.dialog.closeAll();
		this.router.navigateByUrl('/beers')
	}

	onHome() {
		this.dialog.closeAll()
		this.router.navigateByUrl('/home')
	}

	onCancelOrder() {
		const drialogRef = this.dialog.open(ConfirmationDialogComponent, {
			data: {
				name: 'order'
			}
		});
		drialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.orderStore.cancelOrder();
				this.dialog.closeAll();
			}
		})

	}
	onPlaceOrder() {
		this.orderStore.placeOrder()
			.then(res => {
				console.log('success');
				this.dialog.open(OrderBeingProcessedDialogComponent, {
					data: {
						message: 'Your order is being processed'
					}
				})
			})
			.catch(err => console.log(err));
	}
	onDialogClose() {
		this.dialog.closeAll()
	}
}
