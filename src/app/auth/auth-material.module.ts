import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
	],
	exports: [
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
	]
})



export class AuthMaterialModule {
	
}