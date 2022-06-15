import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exhibition } from '../exhibition.model';
import { ShowcaseComponent } from '../showcase/showcase.component';

@Component({
	selector: 'app-exhibition-info',
	templateUrl: './exhibition-info.component.html',
	styleUrls: ['./exhibition-info.component.scss']
})
export class ExhibitionInfoComponent implements OnInit {

	exhibition: Exhibition;


	constructor(
		@Inject(MAT_DIALOG_DATA) private data: any,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.exhibition = this.data.exhibition;
		// this.pageContainer.nativeElement.onmousemove, () => console.log('mousemove')

	}
	onShowcase() {
		this.dialog.open(ShowcaseComponent, {
			data: {
				exhibition: this.exhibition
			},
			maxWidth: '100%',
			maxHeight: '100%',
			height: '100%',
			width: '100%',
			panelClass: 'full-screen',
		})
	}
	on
}
