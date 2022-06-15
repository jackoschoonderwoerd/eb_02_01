import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthStore } from 'src/app/auth/auth.store';
import { AvailableOutsideDialogComponent } from 'src/app/pages/food/available-outside-dialog/available-outside-dialog.component';
import { UiStore } from 'src/app/shared/stores/ui.store';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

	constructor(
		public authStore: AuthStore,
		private router: Router,
		private dialog: MatDialog,
		public uiStore: UiStore
	) { }



	@Output() closeSidenav = new EventEmitter<void>();

	ngOnInit(): void {
	}
	onClose() {
		this.closeSidenav.emit()
	}
	onDinner() {
		this.dialog.open(AvailableOutsideDialogComponent, {
			panelClass: 'beer-info-dialog',
			width: '310px'
		})
		this.onClose()
	}
	onLogOut() {
		this.onClose()
		this.authStore.logOut();
		this.router.navigateByUrl('/drinks')
	}
}
