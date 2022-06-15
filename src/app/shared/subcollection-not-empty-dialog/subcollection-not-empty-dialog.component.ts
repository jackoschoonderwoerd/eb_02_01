import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-subcollection-not-empty-dialog',
    templateUrl: './subcollection-not-empty-dialog.component.html',
    styleUrls: ['./subcollection-not-empty-dialog.component.scss']
})
export class SubcollectionNotEmptyDialogComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {
    }

}
