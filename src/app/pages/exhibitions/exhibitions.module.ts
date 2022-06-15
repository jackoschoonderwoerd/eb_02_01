import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExhibitionsRoutingModule } from './exhibitions-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExhibitionsMaterialModule } from './exhibitions-material.module';
import { AddExhibitionComponent } from './add-exhibition/add-exhibition.component';
import { ExhibitionsComponent } from './exhibitions.component';
import { AddImageDialogComponent } from './add-exhibition/add-image-dialog/add-image-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShowcaseComponent } from './showcase/showcase.component';
import { ExhibitionInfoComponent } from './exhibition-info/exhibition-info.component';
import { NavigationComponent } from './showcase/navigation/navigation.component';




@NgModule({
	declarations: [
		ExhibitionsComponent,
		AddExhibitionComponent,
		AddImageDialogComponent,
  ShowcaseComponent,
  ExhibitionInfoComponent,
  NavigationComponent
	],
	imports: [
		CommonModule,
		ExhibitionsRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		ExhibitionsMaterialModule,
		FlexLayoutModule
	]
})
export class ExhibitionsModule { }
