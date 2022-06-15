import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Drink, DrinkCategory } from '../../drinks.models';
import { DrinksService } from '../drink/drinks.service';


@Component({
	selector: 'app-add-drink-dialog',
	templateUrl: './add-drink-dialog.component.html',
	styleUrls: ['./add-drink-dialog.component.scss']
})
export class AddDrinkDialogComponent implements OnInit {

	form: FormGroup;
	editMode: boolean = false;
	drink: Drink;

	category: DrinkCategory;

	constructor(
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private drinksService: DrinksService,
		private snackBarService: SnackbarService,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.initForm()
		console.log(this.data);
		if (this.data.category) {
			this.category = this.data.category

		}
		if (this.data.drink) {
			this.editMode = true;
			this.drink = this.data.drink
			this.patchForm()
			console.log(this.data)
		} else {

		}
	}

	initForm() {
		this.form = this.fb.group({
			seqNo: new FormControl(null, [Validators.required]),
			nameDutch: new FormControl(null, [Validators.required]),
			nameEnglish: new FormControl(null, [Validators.required]),
			vessel: new FormControl(null, [Validators.required]),
			price: new FormControl(null, [Validators.required]),
		})
	}
	patchForm() {
		this.form.patchValue({
			seqNo: this.drink.seqNo,
			nameDutch: this.drink.nameDutch,
			nameEnglish: this.drink.nameEnglish,
			vessel: this.drink.vessel,
			price: this.drink.price
		})
	}

	onSubmit() {
		if (!this.editMode) {
			const newDrink: Drink = {
				...this.form.value,
				categoryId: this.category.id
			}
			this.drinksService.addDrink(this.category.id, newDrink)
				.then(res => {
					this.snackBarService.openSnackBar('drink added');
					this.dialog.closeAll();
				})
				.catch(err => {
					this.snackBarService.openSnackBar('adding drink failed' + err);
					this.dialog.closeAll();
				})
		} else {
			const editedDrink: Drink = {
				...this.form.value,
				categoryId: this.drink.categoryId,
				id: this.drink.id
			}
			console.log(editedDrink)
			this.drinksService.editDrink(editedDrink)
				.then(res => {
					this.snackBarService.openSnackBar('drink edited');
					this.dialog.closeAll();
				})
				.catch(err => {
					this.snackBarService.openSnackBar('editing drink failed' + err);
					this.dialog.closeAll();
				})


		}
	}
}
