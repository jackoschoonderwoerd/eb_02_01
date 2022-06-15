import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BeersComponent } from "./beers.component";

const routes: Routes = [
	{ path: '', component: BeersComponent }
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class BeersRoutingModule { }