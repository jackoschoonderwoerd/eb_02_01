import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-preview-dutch',
    templateUrl: './preview-dutch.component.html',
    styleUrls: ['./preview-dutch.component.scss']
})
export class PreviewDutchComponent implements OnInit {

    @Input() public dutchAnouncement: string;

    constructor() { }


    ngOnInit(): void {
    }

}
