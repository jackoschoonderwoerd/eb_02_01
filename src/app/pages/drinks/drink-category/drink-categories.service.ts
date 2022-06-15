import { Injectable } from '@angular/core';

import { Drink, DrinkCategory } from '../drinks.models';
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
import { MatDialog } from '@angular/material/dialog';
import { SubcollectionNotEmptyDialogComponent } from 'src/app/shared/subcollection-not-empty-dialog/subcollection-not-empty-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class DrinkCategoriesService {

    constructor(
        private firestore: Firestore,
        private dialog: MatDialog
    ) { }

    addDrinkCategory(drinkCategory: DrinkCategory) {
        const drinkCategoryRef = collection(this.firestore, `drinks`);
        return addDoc(drinkCategoryRef, drinkCategory)
    }

    editDrinkCategory(category: DrinkCategory) {
        const updateCategoryRef = doc(this.firestore, `drinks/${category.id}`);
        return setDoc(updateCategoryRef, category)
    }

    getDrinkCategories(): Observable<DrinkCategory[]> {
        const drinkCategoriesRef = collection(this.firestore, 'drinks');
        return collectionData(drinkCategoriesRef, { idField: 'id' }) as Observable<DrinkCategory[]>
    }
    deleteCategory(category) {
        console.log(this.getNumberOfDrinksInCategory(category.id))
        const subscription =  this.getNumberOfDrinksInCategory(category.id).subscribe((drinks: Drink[]) => {
            if(drinks.length > 0) {
                console.log(drinks.length)
                this.dialog.open(SubcollectionNotEmptyDialogComponent, {
                    data: {
                        name: category.name
                    }
                })
                subscription.unsubscribe();
            } else {
                console.log('delete');
                const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                    data: category.name
                })
                dialogRef.afterClosed().subscribe((res) => {
                    if(res) {
                        const doomedCategoryRef = doc(this.firestore, `drinks/${category.id}`);
                        deleteDoc(doomedCategoryRef)
                    }
                })
            }
        })
    }

    getDrinksByCategory(categoryId: String) {
        const drinksRef = collection(this.firestore, `drinks/${categoryId}/drinks`);
        return collectionData(drinksRef, { idField: 'id' }) as Observable<Drink[]>
    }

    getNumberOfDrinksInCategory(categoryId) {
        const drinksRef = collection(this.firestore, `drinks/${categoryId}/drinks`);
        return collectionData(drinksRef)  
    }
}
