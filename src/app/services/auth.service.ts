import 'firebase/auth'
import firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<firebase.User> = null;
  private user: firebase.User;

  constructor(private afa: AngularFireAuth) {
    this.user$ = this.afa.authState;
    this.user$.subscribe(async user => this.user = user);
  }

  get uid(): string {
    return this.user.uid;
  }

  public async getUserToken() {
    return await this.user.getIdToken();
  }

  public adminLogin(email: string, pass: string) {
    return this.afa.signInWithEmailAndPassword(email, pass);
  }

  public anonymousLogin () {
    return this.afa.signInAnonymously();
  }

  public logOut() {
    return this.afa.signOut();
  }

  public forgotPassword(email: string) {
    return this.afa.sendPasswordResetEmail(email);
  }
}
