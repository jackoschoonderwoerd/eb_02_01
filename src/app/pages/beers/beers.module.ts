import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeersComponent } from './beers.component';
import { BeersRoutingModule } from './beers-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BeersMaterialModule } from './beers-material.module';
import { AddBeerDialogComponent } from './add-beer-dialog/add-beer-dialog.component';
import { BeerComponent } from './beer/beer.component';
import { BeerInfoDialogComponent } from './beer/beer-info-dialog/beer-info-dialog.component';



@NgModule({
	declarations: [
		BeersComponent,
  AddBeerDialogComponent,
  BeerComponent,
  BeerInfoDialogComponent
	],
	imports: [
		CommonModule,
		BeersRoutingModule,
		FlexLayoutModule,
		ReactiveFormsModule,
		BeersMaterialModule
	]
})
export class BeersModule { }
