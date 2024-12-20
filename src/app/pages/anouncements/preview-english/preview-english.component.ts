import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-preview-english',
    templateUrl: './preview-english.component.html',
    styleUrls: ['./preview-english.component.scss']
})
export class PreviewEnglishComponent implements OnInit {


    @Input() public englishAnouncement: string;
    constructor() { }

    ngOnInit(): void {
    }

}
