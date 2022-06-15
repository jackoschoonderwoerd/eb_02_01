import { OrderedBeer } from "src/app/pages/beers/beer.model";
import { OrderedDrink } from "src/app/pages/drinks/drink-category/drink/order-drink-dialog/order-drink.model";
import { Dish } from "src/app/pages/food/food-models/foods.model";

export interface Order {
	tableNumber: number;
	processed: boolean;
	orderedDrinks?: OrderedDrink[];
	orderedBeers?: OrderedBeer[];
	orderedDishes?: OrderedDish[];
	totalPrice: number;
	timestamp?: number;
}

export interface OrderedDish {
	dish: Dish;
	amount: number;
}