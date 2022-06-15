import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Course, Dish } from '../../../food-models/foods.model';
import { DishesService } from '../dishes.service';

@Component({
	selector: 'app-add-dish-dialog',
	templateUrl: './add-dish-dialog.component.html',
	styleUrls: ['./add-dish-dialog.component.scss']
})
export class AddDishDialogComponent implements OnInit {

	form: FormGroup;
	course: Course;
	editMode: boolean = false;
	dish: Dish;



	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private dishesService: DishesService,
		private snackBarService: SnackbarService,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		console.log(this.data)
		this.initForm()
		if (this.data.dish) {
			this.dish = this.data.dish;
			this.editMode = true;
			this.patchForm()
		} else if (this.data.course) {
			this.course = this.data.course
		}
	}
	initForm() {
		this.form = this.fb.group({
			seqNo: new FormControl(null, [Validators.required]),
			nameDutch: new FormControl(null, [Validators.required]),
			descriptionDutch: new FormControl(null),
			nameEnglish: new FormControl(null, [Validators.required]),
			descriptionEnglish: new FormControl(null),
			availableOutside: new FormControl(true),
			price: new FormControl(null, [Validators.required]),
		})
	}

	patchForm() {
		this.form.patchValue({
			seqNo: this.dish.seqNo,
			nameDutch: this.dish.nameDutch,
			descriptionDutch: this.dish.descriptionDutch,
			nameEnglish: this.dish.nameEnglish,
			descriptionEnglish: this.dish.descriptionEnglish,
			availableOutside: this.dish.availableOutside,
			price: this.dish.price
		})
		this.form.updateValueAndValidity();
	}
	onSubmit() {
		if (!this.editMode) {
			const newDish: Dish = {
				...this.form.value,
				courseId: this.course.courseId,
				mealType: this.course.mealType
			}
			this.dishesService.addDish(newDish)
				.then(res => {
					this.snackBarService.openSnackBar('dish added');
					this.dialog.closeAll();
				})
				.catch(err => {
					this.snackBarService.openSnackBar('adding dish failed' + err);
					this.dialog.closeAll();
				})

		} else {
			const editedDish: Dish = {
				...this.form.value,
				dishId: this.dish.dishId,
				courseId: this.dish.courseId,
				mealType: this.dish.mealType
			}
			this.dishesService.editDish(editedDish)
				.then(res => {
					this.snackBarService.openSnackBar('dish edited');
					this.dialog.closeAll();
				})
				.catch(err => {
					this.snackBarService.openSnackBar('editing dish failed' + err)
					this.dialog.closeAll();
				})
		}
	}
}
