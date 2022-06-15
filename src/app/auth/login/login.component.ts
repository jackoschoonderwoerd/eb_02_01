import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStore } from '../auth.store';
import { User } from '../models/user.model';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	form: FormGroup

	constructor(
		private fb: FormBuilder,
		private authService: AuthStore,
		private router: Router
	) { }

	ngOnInit(): void {
		this.initForm()
	}
	initForm() {
		this.form = this.fb.group({
			email: new FormControl(null, [Validators.required]),
			password: new FormControl(null, [Validators.required])
		})
	}
	onLogIn() {
		console.log(this.form.value);
		const user: User = {
			...this.form.value
		}
		this.authService.logIn(user).subscribe(
			(user: User) => {
				console.log(user);
				this.router.navigateByUrl('/home')
			});
	}

}
