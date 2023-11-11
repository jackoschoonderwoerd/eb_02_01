import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './shared/loading/loading.service';
import { OrderStore } from './shared/stores/order.store';
import { UiStore } from './shared/stores/ui.store';
import { SwUpdate } from '@angular/service-worker';
import { MatDialog } from '@angular/material/dialog';
import { TemporaryModalComponent } from './pages/temporary-modal/temporary-modal.component';

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
        private dialog: MatDialog) {

    }
    ngOnInit(): void {
        // this.router.navigate([], { fragment: 'spirits' })
        this.orderStore.checkLocalStorage();
        this.dialog.open(TemporaryModalComponent, {
            panelClass: 'full-screen',
            maxWidth: '300px',
            maxHeight: '90vh'
        });
        if (this.swUpdate.isEnabled) {
            this.swUpdate.versionUpdates.subscribe(() => {
                if (confirm('New version available. Load new version?')) {
                    window.location.reload();
                }
            });
        }
    }
}
