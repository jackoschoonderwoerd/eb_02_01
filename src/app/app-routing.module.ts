import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'drinks', loadChildren: () => import('./pages/drinks/drinks.module').then(m => m.DrinksModule) },
	{ path: 'food', loadChildren: () => import('./pages/food/food.module').then(m => m.FoodModule) },
	{ path: 'company', loadChildren: () => import('./pages/company/company.module').then(m => m.CompanyModule) },
	{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
	{ path: 'beers', loadChildren: () => import('./pages/beers/beers.module').then(m => m.BeersModule) },
	{ path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
	{ path: 'exhibitions', loadChildren: () => import('./pages/exhibitions/exhibitions.module').then(m => m.ExhibitionsModule) },
	{ path: '**', redirectTo: 'drinks' },
];

const routerOptions: ExtraOptions = {
	scrollPositionRestoration: "enabled",
	anchorScrolling: "enabled"
}

@NgModule({
	imports: [RouterModule.forRoot(routes, routerOptions)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
