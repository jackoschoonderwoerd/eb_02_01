import { NgModule } from "@angular/core";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { DrinksComponent } from "./drinks.component";

const routes: Routes = [
	{ path: '', component: DrinksComponent }
]



@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})


export class DrinksRoutingModule { }