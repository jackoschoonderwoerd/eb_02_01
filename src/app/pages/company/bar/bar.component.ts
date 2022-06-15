import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { timeStamp } from 'console';
import { map, Observable, tap } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { Order } from 'src/app/shared/models/order.model';
import { OrderStore } from 'src/app/shared/stores/order.store';
import { UiStore } from 'src/app/shared/stores/ui.store';
import { sortByTimestamp } from '../../drinks/drink-category/drink/order-drink-dialog/order-drink.model';
import { CompanyService } from '../company.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@Component({
	selector: 'app-bar',
	templateUrl: './bar.component.html',
	styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

	orders$: Observable<Order[]>
	displayedColumns = ['date', 'table', 'drinks', 'beers', 'food', 'delete', 'processed']
	orders: Order[];
	dataSource = new MatTableDataSource<Order>()
	@ViewChild(MatSort) sort: MatSort;
	disableSound: boolean = false

	onLineOrdering$ = new Observable<boolean>();

	constructor(
		private companyService: CompanyService,
		private dialog: MatDialog,
		public uiStore: UiStore,

	) { }

	ngOnInit(): void {
		this.uiStore.getOnlineOrdering().subscribe(status => {
			console.log(status)
		})
		this.onLineOrdering$ = this.uiStore.onLineOrdering$
		this.companyService.getAllOrders().subscribe((orders: Order[]) => {
			console.log(orders)
			this.playAudio();

			this.orders = orders;
			this.orders = orders.sort(sortByTimestamp).reverse()
			this.dataSource.data = orders;
		})
	}

	onLineOrderingOn() {
		this.uiStore.onlineOrderingOn()
	}
	onLineOrderingOff() {
		this.uiStore.onlineOrderingOff()
	}


	onDeleteOrder(elementId, timestamp) {
		const date = new Date(timestamp);
		let hour = date.getHours()
		if (hour > 12) {
			hour = hour - 12
		}
		const minutes = date.getMinutes()
		const hourOrdered = (hour + ':' + minutes);
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			data: {
				name: hourOrdered
			}
		})
		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.companyService.deleteOrderById(elementId)
					.then(res => console.log('success'))
					.catch(err => console.log(err))
			}
		})
	}
	onProcessed(orderId, processed) {
		console.log(orderId, processed)
		this.companyService.orderProcessed(orderId, processed)
			.then(res => {
				console.log('success')
			})
			.catch(err => {
				console.log(err);
			});

	}

	toggleSound() {
		this.disableSound = !this.disableSound
	}

	playAudio() {
		if (!this.disableSound) {
			console.log('playing audio')
			let audio = new Audio();
			audio.src = './../../../assets/audio/WHISTLE3.wav';
			audio.load();
			audio.play();
		}

	}
	onDetail(element) {
		this.dialog.open(OrderDetailComponent, {
			data: {
				order: element
			}
		})
		console.log(element)
	}
}
