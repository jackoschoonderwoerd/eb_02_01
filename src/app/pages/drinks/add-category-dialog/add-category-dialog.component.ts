import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Drink, DrinkCategory } from '../drinks.models';

@Component({
    selector: 'app-add-category-dialog',
    templateUrl: './add-category-dialog.component.html',
    styleUrls: ['./add-category-dialog.component.scss']
})
export class AddCategoryDialogComponent implements OnInit {

    form: FormGroup;
    editMode: boolean = false;

    constructor(
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {
        this.initForm()
        if(this.data) {
            console.log(this.data.category);
            this.editMode = true;
            this.setForm();
        }
    }
    initForm() {

        this.form = this.fb.group({
            id: new FormControl(null),
            name: new FormControl(null, [Validators.required]),
            seqNo: new FormControl(null, [Validators.required])
        })
    }
    setForm() {
        this.form.setValue({
            ...this.data.category
        })
    }
}
