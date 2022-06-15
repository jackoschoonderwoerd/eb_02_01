import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-order-being-processed-dialog',
	templateUrl: './order-being-processed-dialog.component.html',
	styleUrls: ['./order-being-processed-dialog.component.scss']
})
export class OrderBeingProcessedDialogComponent implements OnInit {

	message: string

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: any,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.message = this.data.message
	}
	onWindowClose() {
		this.dialog.closeAll()
	}

}
