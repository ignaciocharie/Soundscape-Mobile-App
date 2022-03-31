import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Iuser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afireauth: AngularFireAuth) { }

  login(credentials: Iuser) {
    return this.afireauth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  logout() {
    return this.afireauth.signOut();
  }

}