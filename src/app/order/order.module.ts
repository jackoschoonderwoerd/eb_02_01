import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDialogComponent } from './order-dialog.component';
import { OrderBeingProcessedDialogComponent } from './order-being-processed-dialog/order-being-processed-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrderMaterialModule } from './order-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsumptionTypeComponent } from './consumption-type/consumption-type.component';



@NgModule({
	declarations: [
		OrderDialogComponent,
		OrderBeingProcessedDialogComponent,
  ConsumptionTypeComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		OrderMaterialModule,
		ReactiveFormsModule
		// BrowserModule
	]
})
export class OrderModule { }
