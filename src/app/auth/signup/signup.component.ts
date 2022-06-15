import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthStore } from '../auth.store';
import { User } from '../models/user.model';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    form: FormGroup

    constructor(
        private fb: FormBuilder,
        private authService: AuthStore
    ) { }

    ngOnInit(): void {
        this.initForm()
    }
    initForm() {
        this.form = this.fb.group({
            email: new FormControl('jackoboes@gmail.com', [Validators.required]),
            password: new FormControl('123456', [Validators.required])
        })
    }
    onSignUp() {
        console.log(this.form.value);
        const user: User = {
            ...this.form.value
        }
        this.authService.signUp(user);
    }
}
