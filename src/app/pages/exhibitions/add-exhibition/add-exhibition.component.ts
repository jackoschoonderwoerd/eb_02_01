import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Exhibition } from '../exhibition.model';
import { ExhibitionsService } from '../exhibitions.service';
import { AddImageDialogComponent } from './add-image-dialog/add-image-dialog.component';
import { Image } from './add-image-dialog/image.model';

@Component({
	selector: 'app-add-exhibition',
	templateUrl: './add-exhibition.component.html',
	styleUrls: ['./add-exhibition.component.scss']
})
export class AddExhibitionComponent implements OnInit {

	form: FormGroup;
	exhibition: Exhibition
	exhibition$: Observable<Exhibition>
	editMode: boolean = false;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private dialog: MatDialog,
		private exhibitionsService: ExhibitionsService,
		private route: ActivatedRoute,
		private snackBarService: SnackbarService

	) { }

	ngOnInit(): void {
		this.exhibition = {
			title: null,
			start: null,
			end: null,
			images: [],
			artistNames: [],
			description: null
		}
		const id = this.route.snapshot.paramMap.get('id')
		if (id) {
			this.editMode = true;
			console.log(id);
			this.exhibitionsService.getExhibitionById(id).subscribe((exhibition: Exhibition) => {
				this.exhibition = exhibition;
				this.sortImages()
				this.exhibition.id = id;
				console.log(this.exhibition)
				this.exhibition.artistNames.forEach((name: string) => {
					console.log(name);
					const control = new FormControl(name);
					(<FormArray>this.form.get('artistNames')).push(control);
				})
				console.log(this.form.value)
				this.form.patchValue({
					title: exhibition.title,
					start: new Date(exhibition.start),
					end: new Date(exhibition.end),
					description: exhibition.description
				})
				console.log(this.form.value)
			})
		}
		if (localStorage.getItem('exhibition')) {
			this.exhibition = JSON.parse(localStorage.getItem('exhibition'))
			console.log(this.exhibition)
		}

		this.initForm()
	}
	initForm() {
		this.form = this.fb.group({
			title: new FormControl(null, [Validators.required]),
			start: new FormControl(null),
			end: new FormControl,
			artistNames: new FormArray([]),
			description: new FormControl(null)
		})
	}
	onAddArtistName() {
		const control = new FormControl(null, [Validators.required]);
		(<FormArray>this.form.get('artistNames')).push(control)
	}

	onAddImage() {
		const dialogRef = this.dialog.open(AddImageDialogComponent, {
			maxWidth: '100vw',
			maxHeight: '100vh',
			height: '100%',
			width: '100%',
			panelClass: 'full-screen',
		})
		dialogRef.afterClosed().subscribe((newImage: Image) => {
			if (newImage) {
				const index = this.exhibition.images.findIndex((image: Image) => {
					return image.filePath === newImage.filePath;
				});
				console.log(index);
				if (index != -1) {
					this.exhibition.images[index] = newImage
				} else {
					this.exhibition.images.push(newImage);
				}
				this.storeInLs()
			}
		})
	}

	onEditImage(image: Image) {
		const dialogRef = this.dialog.open(AddImageDialogComponent, {
			data: {
				image: image
			},
			maxWidth: '100vw',
			maxHeight: '100vh',
			height: '100%',
			width: '100%',
			panelClass: 'full-screen',

		})
		dialogRef.afterClosed().subscribe((newImage: Image) => {

			const index = this.exhibition.images.findIndex((image: Image) => {
				return image.filePath === newImage.filePath;
			});
			console.log(index);
			this.sortImages()
			if (index != -1) {
				this.exhibition.images[index] = newImage
			} else {
				this.exhibition.images.push(newImage);
			}
			this.sortImages()
			this.storeInLs()
		})
	}

	sortImages() {
		this.exhibition.images = this.exhibition.images.sort((a: Image, b: Image) => {
			return a.seqNo - b.seqNo;
		})
	}

	onDeleteImage(doomedImage: Image) {
		if (doomedImage) {
			const index = this.exhibition.images.findIndex((image: Image) => {
				return image.filePath === doomedImage.filePath
			})
			this.exhibition.images.splice(index, 1);
		}
	}

	onAddExhibition() {
		this.exhibition.title = this.form.value.title;
		this.exhibition.start = new Date(this.form.value.start).getTime()
		this.exhibition.end = new Date(this.form.value.end).getTime();
		this.exhibition.artistNames = this.form.value.artistNames;
		this.exhibition.description = this.form.value.description;
		if (!this.editMode) {
			this.exhibitionsService.addExhibition(this.exhibition)
				.then(res => {
					this.snackBarService.openSnackBar('exhibition added');
					console.log('success')
					this.removeExhibitionFromLs()
					this.exhibition = null;
					this.router.navigateByUrl('exhibitions')
				})
				.catch(err => {
					console.log(err)
					this.snackBarService.openSnackBar('adding exhibition failed' + err)
				});
		} else {
			console.log(this.exhibition);
			this.exhibitionsService.editExhibition(this.exhibition)
				.then(res => {
					console.log('success');
					this.router.navigateByUrl('exhibitions');
				})
				.catch(err => console.log(err));
		}
	}
	onCancel() {
		this.router.navigateByUrl('/exhibitions')
	}
	storeInLs() {
		localStorage.setItem('exhibition', JSON.stringify(this.exhibition));
	}
	removeExhibitionFromLs() {
		localStorage.removeItem('exhibition');
	}
}
