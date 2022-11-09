import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthStore } from 'src/app/auth/auth.store';
import { OrderDialogComponent } from 'src/app/order/order-dialog.component';

import { OrderedDrink } from 'src/app/pages/drinks/drink-category/drink/order-drink-dialog/order-drink.model';
import { AvailableOutsideDialogComponent } from 'src/app/pages/food/available-outside-dialog/available-outside-dialog.component';
import { Order } from 'src/app/shared/models/order.model';
import { OrderStore } from 'src/app/shared/stores/order.store';
import { UiStore } from 'src/app/shared/stores/ui.store';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Output() sidenavToggle = new EventEmitter<void>();
    language$: Observable<string>
    // orderedDrinks$: Observable<OrderedDrink[]>
    order$: Observable<Order>

    constructor(
        public uiStore: UiStore,
        public authStore: AuthStore,
        private dialog: MatDialog,
        public orderStore: OrderStore,


    ) { }

    ngOnInit(): void {
        this.uiStore.getOnlineOrdering().subscribe(status => {
            // console.log(status)
        })

        // this.language$ = this.uiStore.language$;

        this.order$ = this.orderStore.order$;
        this.orderStore.getOrder().subscribe((order: Order) => {
            // console.log(order);
        })
    }
    onToggleSidenav() {
        this.sidenavToggle.emit();
    }
    onChangeLanguage(language: string) {
        this.uiStore.changeLanguage(language)
    }
    onLogOut() {
        this.authStore.logOut()
    }
    onOrder() {
        this.dialog.open(OrderDialogComponent, {

            maxWidth: '100vw',
            maxHeight: '100vh',
            height: '100%',
            width: '100%',
            panelClass: 'full-screen'
        });
    }
    onDinner() {
        // this.dialog.open(AvailableOutsideDialogComponent, {
        // 	panelClass: 'beer-info-dialog',
        // 	width: '310px'

        // });
    }
}
