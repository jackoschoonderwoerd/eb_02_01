import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class InsideStore {

	private insideSubject = new BehaviorSubject<boolean>(true);
	inside$: Observable<boolean> = this.insideSubject.asObservable();


	constructor(private dialog: MatDialog) { }


	setInside(inside: boolean) {
		console.log('intside: ', inside);
		this.insideSubject.next(inside);
		this.dialog.closeAll();
	}
}
