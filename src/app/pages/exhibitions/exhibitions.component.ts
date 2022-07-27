import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStore } from 'src/app/auth/auth.store';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { UiStore } from 'src/app/shared/stores/ui.store';
import { ExhibitionInfoComponent } from './exhibition-info/exhibition-info.component';
import { Exhibition } from './exhibition.model';
import { ExhibitionsService } from './exhibitions.service';
import { ShowcaseComponent } from './showcase/showcase.component';

@Component({
	selector: 'app-exhibitions',
	templateUrl: './exhibitions.component.html',
	styleUrls: ['./exhibitions.component.scss']
})
export class ExhibitionsComponent implements OnInit {

	exhibitions$: Observable<Exhibition[]>

	constructor(
		private router: Router,
		private exhibitionsService: ExhibitionsService,
		public uiStore: UiStore,
		public authStore: AuthStore,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.exhibitions$ = this.exhibitionsService.getExhibitions();
		const targetElement = document.getElementById('top-page');
		if (targetElement) {
			// console.log(targetElement)
			// targetElement.scrollIntoView({
			// 	behavior: 'smooth',
			// });
			// window.scrollTo({
			// 	top: 1000,
			// 	behavior: 'smooth'
			// })
		}
	}
	onInfo(exhibition: Exhibition) {
		this.dialog.open(ExhibitionInfoComponent, {
			data: {
				exhibition: exhibition
			},
			maxWidth: '100%',
			maxHeight: '100%',
			height: '100%',
			width: '100%',
			panelClass: 'full-screen',
		})
	}

	// onShowcase(exhibition: Exhibition) {
	// 	this.dialog.open(ShowcaseComponent, {
	// 		data: {
	// 			exhibition: exhibition
	// 		},
	// 		maxWidth: '100%',
	// 		maxHeight: '100%',
	// 		height: '100%',
	// 		width: '100%',
	// 		panelClass: 'full-screen',
	// 	})
	// }
	onAddExhibition() {
		this.router.navigateByUrl('/exhibitions/add-exhibition')
	}
	onEdit(exhibition: Exhibition) {
		this.router.navigateByUrl('/exhibitions/add-exhibition')
	}
	onDelete(exhibition: Exhibition) {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			data: {
				name: exhibition.title
			}
		})
		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.exhibitionsService.deleteExhibition(exhibition.id)
					.then(res => {
						console.log('success')
					})
					.catch(err => console.log(err));
			}
		})
	}

}
