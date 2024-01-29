import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course, Dish } from 'src/app/pages/food/food-models/foods.model';

@Injectable({
    providedIn: 'root'
})
export class OpeningHoursStore {

    public openingHours = {
        openingHoursOpen: '12:00',
        openingHoursClose: '01:00',
        openingHoursWeekendOpen: '12:00',
        openingHoursWeekendClose: '02:00',
        closingHoursMondaySunday: '00:00',
        snacks: '12:00 - 22:00',
        lunch: '12:00 - 16:00',
        dinner: '17:30 - 21:30'
    }

    private openingHoursSubject = new BehaviorSubject<Object>(this.openingHours)

    openingHours$: Observable<Object> = this.openingHoursSubject.asObservable();




    // bla() {

    // }


    getOpeningHours() {
        return this.openingHours$;
    }

    // private languageSubject = new BehaviorSubject<string>('nl');

    // private addingCourseSubject = new BehaviorSubject<boolean>(false);

    // private courseToBeEditedSubject = new BehaviorSubject<Course>(null);

    // private addingDishToCourseSubject = new BehaviorSubject<Course>(null);

    // private editingDishSubject = new BehaviorSubject<Dish>(null);

    // private isLoadingSubject = new BehaviorSubject<boolean>(true)

    // language$: Observable<string> = this.languageSubject.asObservable();

    // addingCourse$: Observable<boolean> = this.addingCourseSubject.asObservable();

    // courseToBeEdited$: Observable<Course> = this.courseToBeEditedSubject.asObservable();

    // addingDishToCourse$: Observable<Course> = this.addingDishToCourseSubject.asObservable();

    // editingDish$: Observable<Dish> = this.editingDishSubject.asObservable();

    // isLoading$: Observable<boolean>= this.isLoadingSubject.asObservable()



    constructor() { }

    // changeLanguage(language: string) {
    //     this.languageSubject.next(language)
    // }
    // addingCourse(isAddingCourse: boolean, course: Course) {
    //     this.addingCourseSubject.next(isAddingCourse)
    //     this.courseToBeEditedSubject.next(course);
    // }

    // addingDishToCourse(course: Course) {
    //     this.addingDishToCourseSubject.next(course)
    // }

    // editingDish(dish) {
    //     this.editingDishSubject.next(dish);
    // }
}
