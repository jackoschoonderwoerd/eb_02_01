import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrinksComponent } from './drinks.component';
import { DrinksRoutingModule } from './drinks-routing.module';
import { AddDrinkDialogComponent } from './drink-category/add-drink-dialog/add-drink-dialog.component';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { DrinksMaterialModule } from './drinks-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DrinkCategoryComponent } from './drink-category/drink-category.component';
import { DrinkComponent } from './drink-category/drink/drink.component';
// import { OrderDrinkDialogComponent } from './drink-category/drink/order-drink-dialog/order-drink-dialog.component';
// import { OrderBeingProcessedComponent } from './drink-category/drink/order-drink-dialog/order-being-processed/order-being-processed.component';



@NgModule({
	declarations: [
		DrinksComponent,
		AddDrinkDialogComponent,
		AddCategoryDialogComponent,
		DrinkCategoryComponent,
		DrinkComponent,
		// OrderDrinkDialogComponent,
		// OrderBeingProcessedComponent
	],
	imports: [
		CommonModule,
		DrinksRoutingModule,
		DrinksMaterialModule,
		ReactiveFormsModule,
		FlexLayoutModule
	]
})
export class DrinksModule { }
