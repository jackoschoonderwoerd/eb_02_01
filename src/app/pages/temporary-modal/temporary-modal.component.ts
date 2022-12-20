import { Component, OnInit } from '@angular/core';
import { UiStore } from '../../shared/stores/ui.store';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-temporary-modal',
    templateUrl: './temporary-modal.component.html',
    styleUrls: ['./temporary-modal.component.scss']
})
export class TemporaryModalComponent implements OnInit {

    constructor(
        public uiStore: UiStore,
        private dialogRef: MatDialogRef<TemporaryModalComponent>
    ) { }

    ngOnInit(): void {
        this.uiStore.language$.subscribe((language: string) => {
            console.log(language);
        })
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
