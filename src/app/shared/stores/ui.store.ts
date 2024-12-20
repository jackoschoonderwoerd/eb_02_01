import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Course, Dish } from '../../pages/food/food-models/foods.model';

// import { DishData } from '../pages/food/models/dishData.model';

@Injectable({
    providedIn: 'root'
})

export class UiStore {

    private languageSubject = new BehaviorSubject<string>('nl');
    language$: Observable<string> = this.languageSubject.asObservable();

    private addingCourseSubject = new BehaviorSubject<boolean>(false);
    addingCourse$: Observable<boolean> = this.addingCourseSubject.asObservable();

    private courseToBeEditedSubject = new BehaviorSubject<Course>(null);
    courseToBeEdited$: Observable<Course> = this.courseToBeEditedSubject.asObservable();

    private onlineOrderingSubject = new BehaviorSubject<boolean>(false);
    onLineOrdering$: Observable<boolean> = this.onlineOrderingSubject.asObservable()

    private anouncementActiveSubject = new BehaviorSubject<boolean>(false);
    anouncementActive$: Observable<boolean> = this.anouncementActiveSubject.asObservable()




    constructor() { }

    changeLanguage(language: string) {
        console.log(language);
        this.languageSubject.next(language)
    }
    onlineOrderingOn() {
        console.log('onlineordereinon')
        this.onlineOrderingSubject.next(true);
    }
    onlineOrderingOff() {
        console.log('onlineorderinoff')
        this.onlineOrderingSubject.next(false)
    }
    getOnlineOrdering() {
        return this.onLineOrdering$
    }
    toggleAnouncementactive() {
        console.log('toggling', this.anouncementActiveSubject.value);
        this.anouncementActiveSubject.next(!this.anouncementActiveSubject.value);
    }
}
