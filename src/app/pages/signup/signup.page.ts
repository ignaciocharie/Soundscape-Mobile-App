import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  passwordMatch: boolean;

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    public loadingCtrl: LoadingController,
    public toaster: ToastController) { }

  ngOnInit() {
  }

  async register() 
  {
    if(this.name && this.phone && this.email && this.password )
    {
      const loading = await this.loadingCtrl.create({
        message: 'processing..',
        spinner: 'crescent',
        showBackdrop: true
      });

      loading.present();

      this.afauth.createUserWithEmailAndPassword(this.email, this.password)
      .then((data) => {
        data.user.sendEmailVerification();
        this.afs.collection('users').doc(data.user.uid).set({
          'userId': data.user.uid,
          'userName': this.name,
          'userPhone': this.phone,
          'userEmail': this.email,
          'createdAt': Date.now()
        })
        .then(() => {
          loading.dismiss();
          this.toast('Registration Success! Please Check Your Email!', 'success');
          this.router.navigate(['/login']);
        })
        .catch(error => {
          loading.dismiss();
          this.toast(error.message, 'danger');
        })
      })
      .catch(error => {
        loading.dismiss();
        this.toast(error.message, 'danger')
      })
    } else {
      this.toast('All fields are required!', 'warning');
    }
  }

  checkPassword()
  {
    if(this.password == this.confirmPassword)
    {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
  }

  async toast(message, status)
  {
    const toast = await this.toaster.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    });

    toast.present();
  }
}