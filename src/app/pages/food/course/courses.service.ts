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
import { DishesService } from './dish/dishes.service';

import { Course, Dish } from '../food-models/foods.model';






@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    constructor(
        private firestore: Firestore,
        private dishesService: DishesService
    ) { }

    addCourse(course: Course) {
        const courseRef = collection(this.firestore, course.mealType)
        return addDoc(courseRef, course)
    }

    deleteCourse(course: Course) {
        const courseRef = doc(this.firestore, `${course.mealType}/${course.courseId}`);
        return deleteDoc(courseRef).then(res => console.log(res))
    }

    editCourse(course: Course) {
        const courseDocRef = doc(this.firestore, `${course.mealType}/${course.courseId}`)
        return setDoc(courseDocRef, course)
    }

    getAllCourses(mealType): Observable<Course[]> {
        const coursesRef = collection(this.firestore, mealType);
        // const coursesBySeqNo = query(coursesRef, orderBy('seqNo'))
        return collectionData(coursesRef, {idField: 'courseId'}) as Observable<Course[]>
    }

    

    getAllDishesIdsWithinACourse (mealType: string, courseId: string):Observable<Dish[]> {
        
        const courseRef = collection(this.firestore, `${mealType}/${courseId}/dishes`);
        return collectionData(courseRef) as Observable<Dish[]>
    }
}
