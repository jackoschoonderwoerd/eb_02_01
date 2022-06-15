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
import { Beer } from './beer.model';

@Injectable({
	providedIn: 'root'
})
export class BeersService {



	constructor(
		private firestore: Firestore
	) { }

	addBeer(beer: Beer) {
		const beerRef = collection(this.firestore, 'beers');
		return addDoc(beerRef, beer)
	}

	editBeer(beer: Beer) {
		console.log(beer)

		const beerRef = doc(this.firestore, `beers/${beer.id}`);
		return setDoc(beerRef, beer)
	}

	deleteBeer(beerId: string) {
		const beerRef = doc(this.firestore, `beers/${beerId}`);
		return deleteDoc(beerRef)
	}

	getAllBeers(): Observable<Beer[]> {
		const beersRef = collection(this.firestore, 'beers');
		return collectionData(beersRef, { idField: 'id' }) as Observable<Beer[]>
	}
}
