import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

	data: string = "The Code Hubs";
	@Output() iconSelected = new EventEmitter<string>();
	@Input() imagesLength: number
	animationActive: boolean = true;

	constructor() { }

	ngOnInit(): void {
		console.log('initialized');
	}

	selectedIcon(selectedIcon) {
		console.log('sending data')
		this.iconSelected.emit(selectedIcon);
		this.animationActive = false;
		setTimeout(() => {
			this.animationActive = true;
		}, 1000);
	}

}
