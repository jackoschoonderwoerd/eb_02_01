
import { AddDishDialogComponent } from './course/dish/add-dish-dialog/add-dish-dialog.component'
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course/course.component';
import { DishComponent } from './course/dish/dish.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FoodComponent } from './food.component';
import { FoodMaterialModule } from './food-material.module';
import { FoodRoutingModule } from './food-routing.module';
import { LoadingComponent } from './../../shared/loading/loading.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCourseDialogComponent } from './course/add-course-dialog/add-course-dialog.component';
import { AvailableOutsideDialogComponent } from './available-outside-dialog/available-outside-dialog.component';


@NgModule({
	declarations: [
		FoodComponent,
		CourseComponent,
		DishComponent,
		LoadingComponent,
		AddDishDialogComponent,
		AddCourseDialogComponent,
		AvailableOutsideDialogComponent
	],
	imports: [
		CommonModule,
		FoodRoutingModule,
		ReactiveFormsModule,
		FoodMaterialModule,
		FlexLayoutModule
	]
})
export class FoodModule { }
