import { NgModule } from "@angular/core";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from '@angular/material/snack-bar';




@NgModule({
	imports: [
		MatToolbarModule,
		MatSidenavModule,
		MatDialogModule,
		MatButtonModule,
		MatListModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,



	],
	exports: [
		MatToolbarModule,
		MatSidenavModule,
		MatDialogModule,
		MatButtonModule,
		MatListModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,

	]
})

export class AppMaterialModule { }