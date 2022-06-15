import { Component, Input, OnInit } from '@angular/core';
import { Beer } from 'src/app/pages/beers/beer.model';
import { Drink } from 'src/app/pages/drinks/drinks.models';
import { Dish } from 'src/app/pages/food/food-models/foods.model';

export interface orderedItem {
	name: string;
	price: number;
}

@Component({
	selector: 'app-consumption-type',
	templateUrl: './consumption-type.component.html',
	styleUrls: ['./consumption-type.component.scss']
})
export class ConsumptionTypeComponent implements OnInit {


	constructor() { }

	@Input() private drinks: Drink[];
	@Input() private beers: Beer[];
	@Input() private dishes: Dish[];

	orderedItems: orderedItem[];


	ngOnInit(): void {
		if (this.drinks) {
			this.orderedItems = this.drinks;
			console.log(this.drinks)
		} else if (this.beers) {
			this.orderedItems = this.beers;
			console.log(this.beers)
		} else if (this.dishes) {
			// this.orderedItems = this.dishes
			console.log(this.dishes)
		}
	}
}
