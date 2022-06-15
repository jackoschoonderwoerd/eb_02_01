import { Order } from "src/app/shared/models/order.model";
import { Drink } from "../../../drinks.models"

// export interface Order {
// 	tableNumber: number;
// 	processed: boolean;
// 	orderedDrinks?: OrderedDrink[],
// 	price?: number;
// 	timestamp?: number;
// }

export interface OrderedDrink {
	drink: Drink;
	amount: number
}
export function sortByTimestamp(order1: Order, order2: Order) {
	return order1.timestamp - order2.timestamp;
}