import { Injectable } from '@angular/core';
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

import { Dish } from '../../food-models/foods.model';



@Injectable({
	providedIn: 'root'
})
export class DishesService {

	constructor(
		private firestore: Firestore,
	) { }

	addDish(dish: Dish) {
		console.log(dish);
		const dishRef = collection(this.firestore, `${dish.mealType}/${dish.courseId}/dishes`)
		return addDoc(dishRef, dish)
			.then(res => console.log(res))
			.catch(err => console.log(err))
	}
	editDish(dish) {
		console.log(dish);
		const dishRef = doc(this.firestore, `${dish.mealType}/${dish.courseId}/dishes/${dish.dishId}`);
		return setDoc(dishRef, dish)
	}
	deleteDish(dish: Dish) {
		console.log(dish);
		const dishRef = doc(this.firestore, `${dish.mealType}/${dish.courseId}/dishes/${dish.dishId}`);
		return deleteDoc(dishRef)
	}


	getAllDishes(mealType: string, courseId: string): Observable<Dish[]> {
		const dishesRef = collection(this.firestore, `${mealType}/${courseId}/dishes`);
		const dishesBySeqNo = query(dishesRef, orderBy('seqNo'));
		return collectionData(dishesBySeqNo, { idField: 'dishId' }) as Observable<Dish[]>;
	}
}
