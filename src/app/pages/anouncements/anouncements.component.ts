import { Component, OnInit } from '@angular/core';
import { UiStore } from 'src/app/shared/stores/ui.store';
import { AnouncementService } from './anouncement.service';
import { take } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TemporaryModalComponent } from '../temporary-modal/temporary-modal.component';

export interface Anouncements {
    dutchAnouncement: string;
    englishAnouncement: string;
    secondsFrom: number;
    secondsUntil: number;
}

@Component({
    selector: 'app-anouncements',
    templateUrl: './anouncements.component.html',
    styleUrls: ['./anouncements.component.scss']
})
export class AnouncementsComponent implements OnInit {

    anouncementStatus: boolean;
    form: FormGroup;
    rows: number = 20;
    mytext: string;
    anouncementDutch: string;
    anouncementEnglish: string;

    constructor(
        public uiStore: UiStore,
        private anouncementService: AnouncementService,
        private fb: FormBuilder,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.initForm()
        this.anouncementService.getAnouncements().subscribe((anouncementData: any) => {
            console.log(anouncementData)
            this.anouncementDutch = anouncementData.anouncementDutch;
            this.anouncementEnglish = anouncementData.anouncementEnglish;
            this.anouncementStatus = anouncementData.status
            // this.form.setValue({ ...anouncementData })
            this.patchForm(anouncementData)

        })
    }

    initForm() {
        this.form = this.fb.group({
            anouncementDutch: new FormControl(null),
            anouncementEnglish: new FormControl(null),
            startDate: new FormControl(null),
            endDate: new FormControl(null)
        })
    }
    patchForm(formData) {
        console.log(formData)
        this.form.patchValue({

            // ...formData
            anouncementDutch: formData.anouncementDutch,
            anouncementEnglish: formData.anouncementEnglish,
            startDate: new Date(formData.secondsFrom * 1000),
            endDate: new Date(formData.secondsUntil * 1000)
        })
    }

    dutchAnouncementChange() {
        console.log(this.form.value.anouncementDutch);
        this.anouncementDutch = this.form.value.anouncementDutch
    }
    englishAnouncementChange() {
        this.anouncementEnglish = this.form.value.anouncementEnglish
    }

    submit() {
        console.log(this.form.value)
        const formValue = this.form.value;
        console.log(formValue);
        const anouncements: Anouncements = {
            dutchAnouncement: formValue.anouncementDutch,
            englishAnouncement: formValue.anouncementEnglish,
            secondsFrom: formValue.startDate.getTime() / 1000,
            secondsUntil: formValue.endDate.getTime() / 1000
        }
        console.log(anouncements);

        this.anouncementService.setAnouncements(anouncements).then((res: any) => {
            console.log(res)
        })
    }
    previewModal() {
        this.anouncementService.getAnouncements().pipe(take(1)).subscribe((anouncements: any) => {
            console.log(anouncements)
            // if (anouncementsData[0].status) {
            this.dialog.open(TemporaryModalComponent, {
                panelClass: 'full-screen',
                maxWidth: '300px',
                maxHeight: '90vh',
                data: { anouncements }
            });
            // }
        })
    }
    cancel() {

    }
}
