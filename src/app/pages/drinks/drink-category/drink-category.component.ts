import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthStore } from 'src/app/auth/auth.store';
import { UiStore } from 'src/app/shared/stores/ui.store';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { DrinksService } from './drink/drinks.service';
import { Drink, DrinkCategory } from './../drinks.models'
import { AddDrinkDialogComponent } from './add-drink-dialog/add-drink-dialog.component';
import { DrinkCategoriesService } from './drink-categories.service';

@Component({
	selector: 'app-drink-category',
	templateUrl: './drink-category.component.html',
	styleUrls: ['./drink-category.component.scss']
})
export class DrinkCategoryComponent implements OnInit {

	@Input() public category: DrinkCategory
	drinks$: Observable<Drink[]>

	constructor(
		private dialog: MatDialog,
		public authStore: AuthStore,
		private drinksService: DrinksService,
		private drinkCategoriesService: DrinkCategoriesService

	) { }

	ngOnInit(): void {
		this.drinks$ = this.drinksService.getDrinksByCategory(this.category.id)

	}
	onEditCategory() {
		const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
			data: {
				category: this.category
			},
			maxWidth: '100vw',
			maxHeight: '100vh',
			height: '100%',
			width: '100%',
			panelClass: 'full-screen'
		})
		dialogRef.afterClosed().subscribe((category: DrinkCategory) => {
			this.drinkCategoriesService.editDrinkCategory(category)
				.then(() => console.log('success'))
				.catch(err => console.log(err));
		})
	}

	onDeleteCategory() {
		console.log('deleting');
		this.drinkCategoriesService.deleteCategory(this.category);
	}

	onOpenAddDrink() {
		const dialogRef = this.dialog.open(AddDrinkDialogComponent, {
			data: {
				category: this.category
			},
			maxWidth: '100vw',
			maxHeight: '100vh',
			height: '100%',
			width: '100%',
			panelClass: 'full-screen'
		})
		// dialogRef.afterClosed().subscribe((drink: Drink) => {
		// 	console.log(drink);
		// 	this.drinksService.addDrink(this.category, drink)
		// 		.then(() => console.log('success'))
		// 		.catch(err => console.log(err));
		// })
	}
}
