


import { Directive, HostListener, Input, HostBinding } from '@angular/core';
@Directive({ selector: '[imageLoader]' })
export class ImageLoaderDirective {
	@Input('src') imageSrc;
	@HostListener('load')
	loadImage() {
		this.srcAttr = this.imageSrc;
	}

	// @HostBinding('attr.src') srcAttr = "../../assets/pics/Loader.svg"
	@HostBinding('attr.src') srcAttr = "./../assets/images/flags/"
	constructor() { }
}