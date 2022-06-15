import { NgModule } from "@angular/core";

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
	imports: [
		MatButtonModule,
		MatDialogModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatCheckboxModule,

	],
	exports: [
		MatButtonModule,
		MatDialogModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatCheckboxModule,

	]

})

export class FoodMaterialModule { }