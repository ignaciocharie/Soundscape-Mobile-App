import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  fireData = firebase.database().ref('/detailUsers')
  fireUser = firebase.database().ref('/user')

  constructor(public afireauth: AngularFireAuth) { }

  addUser(newUser) {
    return this.afireauth.createUserWithEmailAndPassword(newUser.email, newUser.password).then(() => {
      this.fireUser.child(firebase.auth().currentUser.uid).set({
        email: newUser.email,
        password: newUser.password
      }).then(() => {
        firebase.auth().currentUser.updateProfile({
          displayName: newUser.firstname,
          photoURL: ''
        }).then(() => {
          this.fireData.child(firebase.auth().currentUser.uid).set({
            uid: firebase.auth().currentUser.uid,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            password: newUser.password
          }).then(() => {
            return { success: true }
          });
        });
      });
    });
  };
}