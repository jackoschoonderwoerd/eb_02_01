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
    query,
    Timestamp
} from '@angular/fire/firestore';
import { Anouncements } from './anouncements.component';

@Injectable({
    providedIn: 'root'
})
export class AnouncementService {

    documentId: string = 'Ap83b8KjgY7wKkBn6KgZ'

    constructor(
        private firestore: Firestore
    ) { }



    setAnnouncementStatus(status: boolean) {
        const path = `anouncementStatus/${this.documentId}`
        const updateAnouncementStatus = doc(this.firestore, path);
        return updateDoc(updateAnouncementStatus, { status: status })
    }
    getAnouncements() {
        const updateAnouncementStatus = doc(this.firestore, `anouncementStatus/${this.documentId}`);
        return docData(updateAnouncementStatus)
    }

    setAnouncements(anouncements: Anouncements) {
        console.log(anouncements)
        // return;
        const path = `anouncementStatus/${this.documentId}`
        const updateAnouncements = doc(this.firestore, path)
        return updateDoc(updateAnouncements, {
            anouncementDutch: anouncements.dutchAnouncement,
            anouncementEnglish: anouncements.englishAnouncement,
            secondsFrom: anouncements.secondsFrom,
            secondsUntil: anouncements.secondsUntil
        },)
    }

}
