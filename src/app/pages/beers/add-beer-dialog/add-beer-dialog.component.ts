import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Beer } from '../beer.model';
import { BeersService } from '../beers.service';

@Component({
	selector: 'app-add-beer-dialog',
	templateUrl: './add-beer-dialog.component.html',
	styleUrls: ['./add-beer-dialog.component.scss']
})
export class AddBeerDialogComponent implements OnInit {


	form: FormGroup

	vessels: string[] = ['glass', 'bottle'];

	beers$: Observable<Beer[]>
	beer: Beer;
	editMode: boolean = false;

	constructor(
		private fb: FormBuilder,
		private beerService: BeersService,
		@Inject(MAT_DIALOG_DATA) private data: any
	) { }

	ngOnInit(): void {
		this.initForm();
		if (this.data) {
			this.editMode = true;
			this.beer = this.data.beer;
			this.setForm()
		}
	}

	initForm() {
		this.form = this.fb.group({
			id: new FormControl(null),
			seqNo: new FormControl(null, [Validators.required]),
			name: new FormControl(null, [Validators.required]),
			description: new FormControl(null, [Validators.required]),
			vessel: new FormControl('glass', [Validators.required]),
			clVolume: new FormControl(null, [Validators.required]),
			alcoholPercentage: new FormControl(null, [Validators.required]),
			price: new FormControl(null, [Validators.required])
		})
	}
	setForm() {
		this.form.setValue({
			...this.beer
		})
	}
}
