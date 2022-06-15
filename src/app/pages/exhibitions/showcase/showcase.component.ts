import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { connectStorageEmulator } from '@firebase/storage';
import { Image } from '../add-exhibition/add-image-dialog/image.model';
import { Exhibition } from '../exhibition.model';

@Component({
	selector: 'app-showcase',
	templateUrl: './showcase.component.html',
	styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {

	exhibition: Exhibition;
	index: number = 0;
	imagesLength: number;
	isLoading: boolean = true;
	@ViewChild('image') image: any





	constructor(
		@Inject(MAT_DIALOG_DATA) private data: any,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.exhibition = this.data.exhibition
		console.log(this.exhibition.images)
		this.imagesLength = this.exhibition.images.length;
		this.exhibition.images = this.exhibition.images.sort((a: Image, b: Image) => {
			return a.seqNo - b.seqNo
		})
	}

	onNext() {
		this.isLoading = true;
		if (this.index < this.imagesLength - 1) {
			this.index = this.index + 1;
		} else {
			this.index = 0;
		}
	}
	onPrevious() {
		this.isLoading = true;
		if (this.index == 0) {
			console.log(this.imagesLength - 1)
			this.index = this.imagesLength - 1
		} else {
			this.index = this.index - 1;
		}
	}


	onClose() {
		this.dialog.closeAll();
	}
	selectedIcon(selectedIcon) {
		// REINITALIZE NAVIGATION COMPONENT

		if (selectedIcon == 'next') {
			this.onNext()
		} else if (selectedIcon == 'previous') {
			this.onPrevious()
		} else {
			this.onClose()
		}
	}
	// async function loadImage(imageUrl) {
	// 	let img;
	// 	const imageLoadPromise = new Promise(resolve => {
	// 		img = new Image();
	// 		img.onload = resolve;
	// 		img.src = imageUrl
	// 	});
	// 	await imageLoadPromise
	// 	console.log('image loaded')
	// 	return img
	// }
	imageLoading(e) {
		console.log(e)
		this.isLoading = false;
	}
}
