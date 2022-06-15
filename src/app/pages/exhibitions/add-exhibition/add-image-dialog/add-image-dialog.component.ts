import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExhibitionsService } from '../../exhibitions.service';
import { ImageStorageService } from './image-storage.service';
import { Image } from './image.model';

@Component({
	selector: 'app-add-image-dialog',
	templateUrl: './add-image-dialog.component.html',
	styleUrls: ['./add-image-dialog.component.scss']
})
export class AddImageDialogComponent implements OnInit {

	constructor(
		private fb: FormBuilder,
		private imageStorageService: ImageStorageService,
		private dialogRef: MatDialogRef<AddImageDialogComponent>,
		@Inject(MAT_DIALOG_DATA) private data: any,
		private router: Router
	) { }

	form: FormGroup;
	filePath: string;
	storageIncomplete: boolean = true;
	editMode: boolean = false

	ngOnInit(): void {
		this.initForm()
		if (this.data) {
			this.storageIncomplete = false
			this.editMode = true;
			const image: Image = this.data.image
			this.filePath = image.filePath;
			this.setForm(image)
		}
	}
	initForm() {
		this.form = this.fb.group({
			seqNo: new FormControl(1, [Validators.required]),

			title: new FormControl(null),
			artistName: new FormControl(null),
			copyrightOwner: new FormControl(null),
			price: new FormControl(null)
		})
	}
	setForm(image) {
		this.form.setValue({
			seqNo: image.seqNo,
			title: image.title,
			artistName: image.artistName,
			copyrightOwner: image.copyrightOwner,
			price: image.price
		})
	}
	onChange(e) {
		console.log(e.target.files[0])
		const file = e.target.files[0]
		const filename = e.target.files[0].name.split('.')[0];
		this.form.patchValue({ filename: filename })
		this.imageStorageService.upload('exhibitions/exhibitionTitle', filename, file)
			.then(filePath => {
				this.storageIncomplete = false;
				console.log(filePath)
				this.filePath = filePath
			})
	}
	onAddImage() {
		const image: Image = {
			...this.form.value,
			filePath: this.filePath
		}
		this.dialogRef.close(image);
	}
	onCancel() {
		this.dialogRef.close();
		this.router.navigateByUrl('/exhibitions/add-exhibition')
	}
}
