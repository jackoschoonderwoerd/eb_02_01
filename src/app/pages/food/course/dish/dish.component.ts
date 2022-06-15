import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthStore } from 'src/app/auth/auth.store';
import { OrderDialogComponent } from 'src/app/order/order-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { OrderedDish } from 'src/app/shared/models/order.model';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { InsideStore } from 'src/app/shared/stores/inside.store';
import { OrderStore } from 'src/app/shared/stores/order.store';
import { UiStore } from 'src/app/shared/stores/ui.store';

import { Course, Dish } from '../../food-models/foods.model';
import { AddDishDialogComponent } from './add-dish-dialog/add-dish-dialog.component';


import { DishesService } from './dishes.service';

@Component({
	selector: 'app-dish',
	templateUrl: './dish.component.html',
	styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {


	@Input() public dish: Dish;
	@Input() public courseIn: Course;
	@Input() public mealTypeIn: string;


	@Output() dishData = new EventEmitter<Dish>();

	addDishIsOpen: boolean = false
	openAddDish$: Observable<Course>

	constructor(
		public uiStore: UiStore,
		public dishesService: DishesService,
		private dialog: MatDialog,
		public authStore: AuthStore,
		private orderStore: OrderStore,
		public insideStore: InsideStore,
		public snackBarService: SnackbarService

	) { }

	ngOnInit(): void {

	}

	onDeleteDish(dish: Dish) {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			data: {
				name: dish.nameEnglish
			},
		})
		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				console.log(res);
				this.dishesService.deleteDish(dish)
					.then(() => {
						this.snackBarService.openSnackBar('dish deleted')
					})
					.catch(err => {
						this.snackBarService.openSnackBar('deleting dish failed')
					})
			}
		})
	}

	onOpenEditDishDialog() {
		this.dialog.open(AddDishDialogComponent, {
			data: {
				dish: this.dish
			},
			maxWidth: '100vw',
			maxHeight: '100vh',
			height: '100%',
			width: '100%',
			panelClass: 'full-screen',
		})
	}

	onAddDishToOrder() {
		console.log(this.dish);
		const orderedDish: OrderedDish = {
			dish: this.dish,
			amount: 1
		}
		this.orderStore.addDishToOrder(orderedDish);
		this.dialog.open(OrderDialogComponent, {
			maxWidth: '100vw',
			maxHeight: '100vh',
			height: '100%',
			width: '100%',
			panelClass: 'full-screen'
		})
	}
}