import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatRadioModule,
		MatDialogModule

	],
	exports: [
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatRadioModule,
		MatDialogModule
	]
})

export class BeersMaterialModule { }