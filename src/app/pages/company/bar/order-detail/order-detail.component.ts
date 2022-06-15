import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/shared/models/order.model';

@Component({
	selector: 'app-order-detail',
	templateUrl: './order-detail.component.html',
	styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

	order: Order

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: any
	) { }

	ngOnInit(): void {
		this.order = this.data.order
		console.log(this.order)
	}

}
