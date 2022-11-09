import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    user
} from '@angular/fire/auth';
import { BehaviorSubject, from, map, Observable, pipe, tap } from 'rxjs';

const AUTH_DATA = 'auth_data'

@Injectable({
    providedIn: 'root'
})
export class AuthStore {

    private subject = new BehaviorSubject<User>(null);

    user$: Observable<User> = this.subject.asObservable();
    isLoggedIn$: Observable<boolean>
    isLoggedOut$: Observable<boolean>

    constructor(
        private auth: Auth
    ) {
        this.isLoggedIn$ = this.user$
            .pipe(
                map(user => !!user)
            )

        this.isLoggedOut$ = this.user$
            .pipe(
                map(loggedIn => !loggedIn)
            )
        const user = localStorage.getItem(AUTH_DATA);

        if (user) {
            this.subject.next(JSON.parse(user));
        }
    }

    signUp(user: User) {
        createUserWithEmailAndPassword(this.auth, user.email, user.password)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }



    logIn(user) {
        return from(signInWithEmailAndPassword(this.auth, user.email, user.password))
            .pipe(
                tap((fireAuthUser: any) => {
                    console.log(fireAuthUser.user.email);
                    const user: User = {
                        email: fireAuthUser.user.email
                    }
                    this.subject.next(user)
                    localStorage.setItem(AUTH_DATA, JSON.stringify(user))
                })
            )

    }
    logOut() {
        this.subject.next(null);
        localStorage.removeItem(AUTH_DATA);
    }
}
