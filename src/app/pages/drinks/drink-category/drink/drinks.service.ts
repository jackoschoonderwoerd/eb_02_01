import { EventEmitter, Injectable } from '@angular/core';
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
import { Observable } from 'rxjs';
import { Drink, DrinkCategory } from '../../drinks.models';

@Injectable({
	providedIn: 'root'
})
export class DrinksService {

	public anchorEmitter = new EventEmitter<string>();

	constructor(
		private firestore: Firestore
	) { }

	addDrink(categoryId: string, drink: Drink) {
		const drinkRef = collection(this.firestore, `drinks/${categoryId}/drinks`);
		return addDoc(drinkRef, drink)
	}
	editDrink(drink: Drink) {
		console.log(drink)
		const updateDrinkRef = doc(this.firestore, `drinks/${drink.categoryId}/drinks/${drink.id}`);
		return setDoc(updateDrinkRef, drink)
	}
	deleteDrink(categoryId: string, drinkId: string) {
		const drinkRef = doc(this.firestore, `drinks/${categoryId}/drinks/${drinkId}`);
		return deleteDoc(drinkRef)
	}

	getDrinksByCategory(categoryId: String) {
		const drinksRef = collection(this.firestore, `drinks/${categoryId}/drinks`);
		const drinksBySeqNo = query(drinksRef, orderBy('seqNo'));
		return collectionData(drinksBySeqNo, { idField: 'id' }) as Observable<Drink[]>
	}

	getCategoryById(categoryId) {
		const categoryRef = doc(this.firestore, `drinks/${categoryId}`);
		return docData(categoryRef)
	}

	passOnAnchor(anchor) {
		console.log(anchor)
		this.anchorEmitter.emit(anchor);
	}
}
