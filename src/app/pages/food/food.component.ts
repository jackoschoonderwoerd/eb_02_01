import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ActivationStart, Event, NavigationEnd, Params, Router } from '@angular/router';
import { finalize, last, map, Observable, take, tap } from 'rxjs';
import { AuthStore } from 'src/app/auth/auth.store';

import { LoadingService } from 'src/app/shared/loading/loading.service';
import { InsideStore } from 'src/app/shared/stores/inside.store';
import { OpeningHoursStore } from 'src/app/shared/stores/opening-hours.store';
import { UiStore } from 'src/app/shared/stores/ui.store';
import { AddCourseDialogComponent } from './course/add-course-dialog/add-course-dialog.component';
import { CoursesService } from './course/courses.service';
import { Course, Dish, sortBySeqNo } from './food-models/foods.model';

@Component({
	selector: 'app-food',
	templateUrl: './food.component.html',
	styleUrls: ['./food.component.scss'],
	providers: [LoadingService]
})
export class FoodComponent implements OnInit, AfterViewInit {

	addingDish: boolean = false;
	mealType: string;
	courses$: Observable<Course[]>;
	addingCourse$: Observable<boolean>
	course: Course;
	course$: Observable<Course>;



	constructor(
		private route: ActivatedRoute,
		private foodService: CoursesService,
		private dialog: MatDialog,
		public authStore: AuthStore,
		public uiStore: UiStore,
		public loadingService: LoadingService,
		public openingHoursStore: OpeningHoursStore,
		public insideStore: InsideStore
	) { }

	ngOnInit(): void {


		this.route.queryParams.subscribe((params: Params) => {
			console.log(params.mealType)
			if (params.mealType != this.mealType) {
				this.mealType = params.mealType
				this.loadingService.loadingOn()
				this.courses$ = this.foodService.getAllCourses(this.mealType)
					.pipe(
						map(
							courses => courses.sort(sortBySeqNo)
						),
						tap(() => {
							this.loadingService.loadingOff();
						})
					);
			}
			this.mealType = params.mealType
		})
	}

	ngAfterViewInit(): void {
		const targetElement = document.getElementById('top-page')
		targetElement.scrollIntoView({ behavior: 'smooth' });
	}

	inside(inside: boolean) {
		console.log(inside);
		this.insideStore.setInside(inside);
	}

	onShowAddCourseDialog() {
		this.dialog.open(AddCourseDialogComponent, {
			data: {
				mealType: this.mealType
			},
			maxWidth: '100vw',
			maxHeight: '100vh',
			height: '100%',
			width: '100%',
			panelClass: 'add-course-dialog',
		})
		// dialogRef.afterClosed().subscribe((course: Course) => {
		// 	if (course) {
		// 		console.log(course);
		// 		this.coursesService.addCourse(course)
		// 			.then(() => { console.log('succes') })
		// 			.catch(err => console.log(err));
		// 	}
		// })
	}
	onAddDish(mealType: string, course: Course) {
		this.addingDish = true
	}

	finishedAddingDish() {
		this.addingDish = false;
	}
}
