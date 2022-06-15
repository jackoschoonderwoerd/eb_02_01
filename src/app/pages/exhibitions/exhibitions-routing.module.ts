import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddExhibitionComponent } from "./add-exhibition/add-exhibition.component";
import { ExhibitionsComponent } from "./exhibitions.component";

const routes: Routes = [
	{ path: '', component: ExhibitionsComponent },
	{ path: 'add-exhibition', component: AddExhibitionComponent }
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class ExhibitionsRoutingModule { }