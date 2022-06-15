import { Injectable, NgModule } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@NgModule()

@Injectable()

export class LoadingService {

	private loadingSubject = new BehaviorSubject<boolean>(false);

	loading$: Observable<boolean> = this.loadingSubject.asObservable();

	showLoaderUntilCompleted<T>(Obs$: Observable<T>): Observable<T> {
		return undefined;
	}

	loadingOn() {
		this.loadingSubject.next(true);
	}

	loadingOff() {
		this.loadingSubject.next(false);
	}	

}
