import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from '@angular/material/table';

@NgModule({
	imports: [
		MatTableModule,
		MatButtonModule,
		MatDialogModule
	],
	exports: [
		MatTableModule,
		MatButtonModule,
		MatDialogModule
	]
})

export class CompanyMaterialModule { }