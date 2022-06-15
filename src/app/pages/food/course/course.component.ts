import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthStore } from 'src/app/auth/auth.store';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { UiStore } from 'src/app/shared/stores/ui.store';
import { CoursesService } from './courses.service';
import { Course, Dish } from '../food-models/foods.model';
import { AddCourseDialogComponent } from './add-course-dialog/add-course-dialog.component';
import { AddDishDialogComponent } from './dish/add-dish-dialog/add-dish-dialog.component';
import { DishesService } from './dish/dishes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-course',
	templateUrl: './course.component.html',
	styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

	addingCourse: boolean = false;
	courseId: boolean = false;
	editingCourse: boolean = false;
	dishes$: Observable<Dish[]>
	openAddDish$: Observable<Course>

	constructor(
		public authStore: AuthStore,
		private dialog: MatDialog,
		private coursesService: CoursesService,
		public uiStore: UiStore,
		private dishesService: DishesService,
		private loadingService: LoadingService,
		private snackBar: MatSnackBar
	) { }

	@Input() public course: Course
	@Input() private mealType: string;
	@Output() finishedAdding = new EventEmitter<void>();
	@Output() public courseOut: Course
	@Output() public mealTypeOut: string;


	ngOnInit(): void {
		this.mealType = this.mealType
		this.dishes$ = this.dishesService.getAllDishes(this.mealType, this.course.courseId)
	}

	onDeleteCourse(e, course: Course) {
		console.log(e)
		e.stopPropagation();
		const subscription = this.coursesService.getAllDishesIdsWithinACourse(this.mealType, course.courseId)
			.subscribe((dishes: Dish[]) => {
				if (dishes.length > 0) {
					confirm('Delete all dishes first');
					subscription.unsubscribe();
				} else {
					const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
						data: { name: course.courseNameEnglish }
					});
					dialogRef.afterClosed().subscribe((res) => {
						if (res) {
							this.coursesService.deleteCourse(course)
								.then((res) => {
									this.openSnackBar('Course deleted')
								})
								.catch(err => {
									this.openSnackBar('deleting course failed')
									console.log('Problems deleting course', err)
								})
						}
					})
				}
			})
	}

	onEditCourse(course: Course) {
		this.dialog.open(AddCourseDialogComponent, {
			data: {
				course: course
			},
			maxWidth: '100vw',
			maxHeight: '100vh',
			height: '100%',
			width: '100%',
			panelClass: 'full-screen'
		})
	}


	onOpenAddDishDialog() {
		this.dialog.open(AddDishDialogComponent, {
			data: {
				course: this.course
			},
			maxWidth: '100vw',
			maxHeight: '100vh',
			height: '100%',
			width: '100%',
			panelClass: 'full-screen',
		})
	}

	openSnackBar(message) {
		this.snackBar.open(message, null, {
			duration: 3000
		})
	}

}
