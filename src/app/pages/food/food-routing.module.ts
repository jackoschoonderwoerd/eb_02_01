import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FoodComponent } from "./food.component";

const foodRoutes: Routes = [
	{ path: '', component: FoodComponent },
	{ path: 'snacks', component: FoodComponent },
	{ path: 'lunch', component: FoodComponent },
	{ path: 'dinner', component: FoodComponent }

]

@NgModule({
	imports: [RouterModule.forChild(foodRoutes)],
	exports: [RouterModule]

})
export class FoodRoutingModule { }