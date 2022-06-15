import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderedDrink } from 'src/app/pages/drinks/drink-category/drink/order-drink-dialog/order-drink.model';
import { Drink } from 'src/app/pages/drinks/drinks.models';
import {
	Firestore,
	addDoc,
	collection,
	collectionData,
	collectionGroup,
	doc,
	docData,
	deleteDoc,
	updateDoc,
	DocumentReference,
	setDoc,
	orderBy,
	query
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Order, OrderedDish } from '../models/order.model';
import { Beer, OrderedBeer } from 'src/app/pages/beers/beer.model';
import { Dish } from 'src/app/pages/food/food-models/foods.model';

@Injectable({
	providedIn: 'root'
})
export class OrderStore {

	private orderSubject = new BehaviorSubject<Order>(null)
	order$: Observable<Order> = this.orderSubject.asObservable()

	private orderedDrinksSubject = new BehaviorSubject<OrderedDrink[]>([]);
	orderedDrinks$: Observable<OrderedDrink[]> = this.orderedDrinksSubject.asObservable();

	private orderedBeersSubject = new BehaviorSubject<OrderedBeer[]>([]);
	orderedBeers$: Observable<OrderedBeer[]> = this.orderedBeersSubject.asObservable()

	private totalPriceSubject = new BehaviorSubject<number>(0);
	totalPrice$: Observable<number> = this.totalPriceSubject.asObservable();

	private tableNumberSubject = new BehaviorSubject<number>(null);
	tableNumber$: Observable<number> = this.tableNumberSubject.asObservable();

	orderedDrinks: OrderedDrink[] = []

	order: Order = {
		tableNumber: null,
		processed: false,
		orderedDrinks: [],
		orderedBeers: [],
		orderedDishes: [],
		totalPrice: 0
	}
	totalPrice: number;


	constructor(
		private firestore: Firestore,
		private router: Router,
		private dialog: MatDialog) { }

	addTablenumberToOrder(tableNumber: number) {
		console.log(tableNumber);
		this.order.tableNumber = tableNumber
		this.orderSubject.next(this.order);
		this.tableNumberSubject.next(tableNumber)
		this.storeOrder();
	}

	addDishToOrder(dishOrdered: OrderedDish) {

		console.log(dishOrdered.dish.dishId);

		this.order.orderedDishes.forEach((orderedDish: OrderedDish) => {
			console.log(orderedDish.dish.dishId)
		})
		const index = this.order.orderedDishes.findIndex((orderedDish: OrderedDish) => {
			return orderedDish.dish.dishId === dishOrdered.dish.dishId
		})
		console.log(index)
		if (index !== -1) {
			this.order.orderedDishes[index].amount++
		} else {
			this.order.orderedDishes.push(dishOrdered)
		}
		this.order.totalPrice = this.calculateTotal()
		this.orderSubject.next(this.order);
		// this.calculateTotal();
		this.storeOrder();
	}

	removeDishFromOrder(doomedDish: OrderedDish) {
		const index = this.order.orderedDishes.findIndex((orderedDish: OrderedDish) => {
			return orderedDish.dish.dishId === doomedDish.dish.dishId
		})
		if (this.order.orderedDishes[index].amount > 1) {
			this.order.orderedDishes[index].amount--
		} else {
			this.order.orderedDishes.splice(index, 1)
		}
		this.orderSubject.next(this.order);
		this.order.totalPrice = this.calculateTotal()
		// this.calculateTotal();
		this.storeOrder()
	}

	addDrinkToOrder(drinkOrdered: OrderedDrink) {
		const index = this.order.orderedDrinks.findIndex((orderedDrink: OrderedDrink) => {
			return orderedDrink.drink.id === drinkOrdered.drink.id
		})
		if (index !== -1) {
			this.order.orderedDrinks[index].amount++;
		} else {
			this.order.orderedDrinks.push(drinkOrdered);
		}
		this.orderedDrinksSubject.next(this.order.orderedDrinks);
		this.order.totalPrice = this.calculateTotal();
		// this.calculateTotal();
		this.storeOrder();
	}



	removeDrinkFromOrder(doomedOrderedDrink: OrderedDrink) {
		const index = this.order.orderedDrinks.findIndex((orderedDrink: OrderedDrink) => {
			return orderedDrink.drink.id === doomedOrderedDrink.drink.id;
		})
		if (this.order.orderedDrinks[index].amount > 1) {
			this.order.orderedDrinks[index].amount--
		}
		else {
			this.order.orderedDrinks.splice(index, 1)
		}
		this.orderedDrinksSubject.next(this.order.orderedDrinks);
		this.order.totalPrice = this.calculateTotal()
		// this.calculateTotal();
		this.storeOrder();
		console.log(this.order)
	}

	addBeerToOrder(beerOrdered: OrderedBeer) {
		const index = this.order.orderedBeers.findIndex((orderdBeer: OrderedBeer) => {
			return orderdBeer.beer.id === beerOrdered.beer.id
		})
		if (index !== -1) {
			this.order.orderedBeers[index].amount++
		} else {
			this.order.orderedBeers.push(beerOrdered)
		}
		this.orderedBeersSubject.next(this.order.orderedBeers);
		this.order.totalPrice = this.calculateTotal();
		this.orderSubject.next(this.order)
		// this.calculateTotal();
		this.storeOrder();
		// console.log(this.order)
	}
	removeBeerFromOrder(doomedOrderdBeer: OrderedBeer) {
		const index = this.order.orderedBeers.findIndex((orderedBeer: OrderedBeer) => {
			return orderedBeer.beer.id === doomedOrderdBeer.beer.id
		})
		if (this.order.orderedBeers[index].amount > 1) {
			this.order.orderedBeers[index].amount--
		} else {
			this.order.orderedBeers.splice(index, 1)
		}
		this.order.totalPrice = this.calculateTotal()
		this.orderSubject.next(this.order);
		// this.calculateTotal();
		this.storeOrder();
		// console.log(this.order)
	}

	calculateTotal() {
		let total = 0;
		this.order.orderedDrinks.forEach((orderedDrink: OrderedDrink) => {
			total += (orderedDrink.drink.price * orderedDrink.amount)
		})
		this.order.orderedBeers.forEach((orderedBeer: OrderedBeer) => {
			total += (orderedBeer.beer.price * orderedBeer.amount)
		})
		this.order.orderedDishes.forEach((orderedDish: OrderedDish) => {
			total += (orderedDish.dish.price * orderedDish.amount)
		})
		this.totalPriceSubject.next(total)
		return total
	}

	getAllOrderedDrinks(): Observable<OrderedDrink[]> {
		return this.orderedDrinks$
	}
	getOrder(): Observable<Order> {
		return this.order$
	}
	getTotalPrice(): Observable<number> {
		return this.totalPrice$
	}
	getTableNumber(): Observable<number> {
		return this.tableNumber$
	}

	cancelOrder() {
		this.order = {
			tableNumber: null,
			orderedBeers: [],
			orderedDrinks: [],
			orderedDishes: [],
			totalPrice: 0,
			processed: false
		}


		this.orderSubject.next(this.order);
		this.clearLocalStorage()
	}
	placeOrder() {
		console.log(this.order);
		const finalOrder: Order = {
			...this.order,
			totalPrice: this.calculateTotal(),
			timestamp: new Date().getTime()
		}
		const orderRef = collection(this.firestore, 'orders');
		return addDoc(orderRef, finalOrder)
			.then((res) => {
				this.cancelOrder()
				this.dialog.closeAll();
				this.router.navigateByUrl('/home')
			})
			.catch(err => console.log(err));
	}

	storeOrder() {
		localStorage.setItem('order', JSON.stringify(this.order));
	}

	checkLocalStorage() {
		if (localStorage.getItem('order')) {
			// console.log('order in LS');
			this.order = JSON.parse(localStorage.getItem('order'));
			// this.orderedDrinksSubject.next(this.orderedDrinks);   
			this.orderSubject.next(this.order);
			this.orderedDrinksSubject.next(this.order.orderedDrinks);
			this.totalPriceSubject.next(this.order.totalPrice)
			this.tableNumberSubject.next(this.order.tableNumber);
		}
	}
	clearLocalStorage() {
		localStorage.removeItem('order');
	}
}
