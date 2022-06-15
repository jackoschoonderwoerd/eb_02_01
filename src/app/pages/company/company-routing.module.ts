import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BarComponent } from "./bar/bar.component";

const routes: Routes = [
	{path: 'bar', component: BarComponent}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class CompanyRoutingModule {}