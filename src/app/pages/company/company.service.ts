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
import { Order } from 'src/app/shared/models/order.model';


@Injectable({
	providedIn: 'root'
})
export class CompanyService {

	constructor(
		private firestore: Firestore
	) { }

	getAllOrders() {
		const ordersRef = collection(this.firestore, 'orders')
		return collectionData(ordersRef, { idField: 'id' }) as Observable<Order[]>
	}
	deleteOrderById(orderId: string) {
		const doomedOrderRef = doc(this.firestore, `orders/${orderId}`)
		return deleteDoc(doomedOrderRef)
	}
	orderProcessed(orderId, processed) {
		const orderRef = doc(this.firestore, `orders/${orderId}`)
		return updateDoc(orderRef, { processed: !processed })
	}
}
