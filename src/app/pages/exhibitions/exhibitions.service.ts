import { Injectable } from '@angular/core';
import { Exhibition } from './exhibition.model';
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

@Injectable({
	providedIn: 'root'
})
export class ExhibitionsService {

	constructor(
		private firestore: Firestore
	) { }

	addExhibition(exhibition: Exhibition) {
		const exhibitionRef = collection(this.firestore, 'exhibitions');
		return addDoc(exhibitionRef, exhibition)
	}

	editExhibition(exhibition: Exhibition) {
		console.log(exhibition)
		const exhibitionRef = doc(this.firestore, `exhibitions/${exhibition.id}`)
		return setDoc(exhibitionRef, exhibition)
	}
	deleteExhibition(id: string) {
		console.log(id)
		const exhibitionRef = doc(this.firestore, `exhibitions/${id}`)
		return deleteDoc(exhibitionRef)
	}

	getExhibitions() {
		const exhibitionsRef = collection(this.firestore, 'exhibitions');
		const exhibitionsByStart = query(exhibitionsRef, orderBy('start', 'desc'))
		return collectionData(exhibitionsByStart, { idField: 'id' }) as Observable<Exhibition[]>
	}
	getExhibitionById(id) {
		const exhibitionRef = doc(this.firestore, `exhibitions/${id}`);
		return docData(exhibitionRef)
	}
}
