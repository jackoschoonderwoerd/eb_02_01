import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './shared/loading/loading.service';
import { OrderStore } from './shared/stores/order.store';
import { UiStore } from './shared/stores/ui.store';
import { SwUpdate } from '@angular/service-worker';
import { MatDialog } from '@angular/material/dialog';
import { TemporaryModalComponent } from './pages/temporary-modal/temporary-modal.component';
import { AnouncementService } from './pages/anouncements/anouncement.service';
import { take } from 'rxjs';

interface AnouncementsData {
    secondsFrom: number;
    secondsUntil: number;
    anouncementDutch: string;
    anouncementEnglish: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [LoadingService]
})

export class AppComponent implements OnInit {
    title = 'eb_02_01';
    isLoading: boolean = false;

    constructor(
        public loadingService: LoadingService,
        public uiStore: UiStore,
        private swUpdate: SwUpdate,
        private orderStore: OrderStore,
        private router: Router,
        private anouncementService: AnouncementService,
        private dialog: MatDialog) {

    }
    ngOnInit(): void {
        this.anouncementService.getAnouncements().pipe(take(1)).subscribe((anouncementsData: AnouncementsData) => {
            console.log(anouncementsData)
            const todayTimestamp = Date.now() / 1000;
            const secondsFrom = (anouncementsData.secondsFrom)
            const secondsUntil = (anouncementsData.secondsUntil)
            console.log(secondsFrom, todayTimestamp, secondsUntil)
            if (secondsFrom < todayTimestamp && todayTimestamp < secondsUntil) {
                console.log('modal active')
                this.dialog.open(TemporaryModalComponent, {
                    panelClass: 'full-screen',
                    maxWidth: '300px',
                    maxHeight: '90vh',
                    data: {
                        anouncementDutch: anouncementsData.anouncementDutch,
                        anouncementEnglish: anouncementsData.anouncementEnglish
                    }
                });

            } else {
                console.log('modal idle')
            }
            // if (anouncementsData[0].status) {
            //     this.dialog.open(TemporaryModalComponent, {
            //         panelClass: 'full-screen',
            //         maxWidth: '300px',
            //         maxHeight: '90vh',
            //         data: { anouncements: anouncementsData[0].anouncements }
            //     });
            // }
        })

        this.orderStore.checkLocalStorage();
        if (this.swUpdate.isEnabled) {
            this.swUpdate.versionUpdates.subscribe(() => {
                if (confirm('New version available. Load new version?')) {
                    window.location.reload();
                }
            });
        }
        // this.uiStore.anouncementActive$.subscribe((status: boolean) => {
        //     console.log(status);
        // })
    }
}
