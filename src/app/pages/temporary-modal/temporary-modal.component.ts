import { Component, Inject, OnInit } from '@angular/core';
import { UiStore } from '../../shared/stores/ui.store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Anouncements } from '../anouncements/anouncements.component';

@Component({
    selector: 'app-temporary-modal',
    templateUrl: './temporary-modal.component.html',
    styleUrls: ['./temporary-modal.component.scss']
})
export class TemporaryModalComponent implements OnInit {

    dutchAnouncement: string = ''

    constructor(
        public uiStore: UiStore,
        private dialogRef: MatDialogRef<TemporaryModalComponent>,
        @Inject(MAT_DIALOG_DATA) private anouncements: Anouncements
    ) { }

    ngOnInit(): void {
        console.log(this.anouncements)


    }
    languageSelected(language: string) {
        if (language === 'nl') {
            this.uiStore.changeLanguage('nl');
        } else if (language === 'en') {
            this.uiStore.changeLanguage('en');
        }
    }
    onClose() {
        this.dialogRef.close();
    }


}
