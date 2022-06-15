import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
	selector: 'app-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html',
	styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

	message: string

	constructor(
		@Inject(MAT_DIALOG_DATA) public doomedItem: any
	) { }

	ngOnInit(): void {
		console.log(this.doomedItem);
	}
}
