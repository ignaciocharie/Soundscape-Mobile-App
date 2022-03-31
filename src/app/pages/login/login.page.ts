import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Iuser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials = {} as Iuser;
  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    });
    toast.present();
  }

  async login() {
    this.authService.login(this.credentials).then((res: any) => {
      if (!res.code) {
        this.presentToast('Login Success');
        this.router.navigate(['/home/journal'])
      }
    },
      (err) => {
        this.presentToast('Please try again \n' + err);
      });
  }

  gotoSignUp() {
    this.router.navigate(['signup']);
  }

}