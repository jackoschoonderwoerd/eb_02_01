import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Course } from '../../food-models/foods.model';
import { CoursesService } from '../courses.service';

@Component({
	selector: 'app-add-course-dialog',
	templateUrl: './add-course-dialog.component.html',
	styleUrls: ['./add-course-dialog.component.scss']
})
export class AddCourseDialogComponent implements OnInit {

	form: FormGroup
	editMode: boolean = false;
	mealType: string;
	course: Course

	constructor(
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) private data: any,
		private coursesService: CoursesService,
		private dialog: MatDialog,
		private snackBar: MatSnackBar
	) { }

	ngOnInit(): void {
		this.initForm();
		if (this.data.course) {
			this.editMode = true;
			this.course = this.data.course;
			this.mealType = this.course.mealType;
			this.setEditForm(this.data.course)
		} else if (this.data.mealType) {
			this.mealType = this.data.mealType;
			this.patchAddForm(this.data.mealType)
		}
	}
	initForm() {
		this.form = this.fb.group({
			courseNameDutch: new FormControl(null, [Validators.required]),
			courseNameEnglish: new FormControl(null, [Validators.required]),
			seqNo: new FormControl(null, [Validators.required]),
		})
	}
	setEditForm(course: Course) {
		console.log(course)
		this.form.patchValue({
			seqNo: this.course.seqNo,
			courseNameDutch: this.course.courseNameDutch,
			courseNameEnglish: this.course.courseNameEnglish
		})
	}
	patchAddForm(mealType: string) {
		this.form.patchValue({
			mealType: mealType
		})
	}

	onSubmit() {
		if (!this.editMode) {
			const newCourse: Course = {
				...this.form.value,
				mealType: this.mealType
			}
			this.coursesService.addCourse(newCourse)
				.then(res => {
					this.openSnackBar('course added')
					this.dialog.closeAll()
				})
				.catch(err => {
					console.log(err);
					this.openSnackBar(`adding course failed: ${err}`)
				})
		} else {
			const editedCourse: Course = {
				...this.form.value,
				courseId: this.course.courseId,
				mealType: this.mealType
			}
			this.coursesService.editCourse(editedCourse)
				.then(res => {
					this.openSnackBar('course updated')
					this.dialog.closeAll()
				})
				.catch(err => {
					this.openSnackBar(`updating course failed: ${err}`)
				})
		}
	}

	openSnackBar(message) {
		this.snackBar.open(message, null, {
			duration: 3000
		})
	}
}
