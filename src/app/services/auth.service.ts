import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser: any;

  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      (this._currentUser = user)
    });
  }

  get currentUser() {
    return this._currentUser ? JSON.parse(this._currentUser.displayName) : null;
  }

  get currentUser$() {
    return this.auth.authState;
  }

  register(email: string, password: string, body: string) {
    return from(
      this.auth.createUserWithEmailAndPassword(email, password).then((user) => {
        return user.user?.updateProfile({
          displayName: body,
        });
      })
    );
  }

  signIn(email: string, password: string) {
    return from(this.auth.signInWithEmailAndPassword(email, password));
  }

  signOut() {
    return from(this.auth.signOut());
  }
}
