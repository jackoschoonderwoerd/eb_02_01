import { NgModule } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon'
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
	imports: [
		MatInputModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatButtonModule,
		MatIconModule,
		MatNativeDateModule,
		MatDialogModule,
		MatProgressSpinnerModule,
	],
	exports: [
		MatInputModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatButtonModule,
		MatIconModule,
		MatNativeDateModule,
		MatDialogModule,
		MatProgressSpinnerModule,
	]
})
export class ExhibitionsMaterialModule { } 