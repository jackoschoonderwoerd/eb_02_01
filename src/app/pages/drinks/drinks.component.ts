import { ViewportScroller } from '@angular/common';
import { AfterContentChecked, AfterViewChecked, AfterViewInit, ApplicationRef, Component, ComponentFactoryResolver, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthStore } from 'src/app/auth/auth.store';
import { OrderBeingProcessedDialogComponent } from 'src/app/order/order-being-processed-dialog/order-being-processed-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { OpeningHoursStore } from 'src/app/shared/stores/opening-hours.store';
import { UiStore } from 'src/app/shared/stores/ui.store';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { DrinkCategoriesService } from './drink-category/drink-categories.service';
import { DrinksService } from './drink-category/drink/drinks.service';
import { DrinkCategory } from './drinks.models';


@Component({
	selector: 'app-drinks',
	templateUrl: './drinks.component.html',
	styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {

	drinkCategories$: Observable<DrinkCategory[]>
	openingHours$: Observable<Object>
	onLineOrdering$: Observable<boolean>;
	isLoggedIn$: Observable<boolean>;


	constructor(
		private dialog: MatDialog,
		private drinkCategoriesService: DrinkCategoriesService,
		public authStore: AuthStore,
		public openingHoursStore: OpeningHoursStore,
		public uiStore: UiStore,
		private drinksService: DrinksService

	) { }

	ngOnInit(): void {
		this.isLoggedIn$ = this.authStore.isLoggedIn$
		this.drinkCategories$ = this.drinkCategoriesService.getDrinkCategories();
		this.openingHours$ = this.openingHoursStore.getOpeningHours();
		this.onLineOrdering$ = this.uiStore.onLineOrdering$
		this.drinksService.anchorEmitter.subscribe((anchor: string) => {
			if (anchor) {
				console.log(anchor)
				const targetElement = document.getElementById(anchor);
				targetElement.scrollIntoView({ behavior: 'smooth' });
			} else {
				const targetElement = document.getElementById('top-page')
				targetElement.scrollIntoView({ behavior: 'smooth' });
			}
		})
	}

	onShowAddCategory() {
		const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
			maxWidth: '100vw',
			maxHeight: '100vh',
			height: '100%',
			width: '100%',
			panelClass: 'full-screen'
		})
		dialogRef.afterClosed().subscribe((drinkCategory: DrinkCategory) => {
			console.log(drinkCategory);
			this.drinkCategoriesService.addDrinkCategory(drinkCategory)
				.then(() => console.log('success'))
				.catch(err => console.log(err));
		})
	}
}
