import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  newUser = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  constructor(
    private router: Router,
    private userService: UserService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    });
    toast.present();
  }

  async register() {
    if (this.newUser.firstname == '' ||
      this.newUser.lastname == '' ||
      this.newUser.email == '' ||
      this.newUser.password == '' ||
      this.newUser.confirmPassword == '') {
      this.presentToast('All fields are require');
    } else if (this.newUser.password !== this.newUser.confirmPassword) {
      this.presentToast("Passowrd don't match");
    } else if (this.newUser.password.length < 8) {
      this.presentToast('Passowrd should have more than 8 characters');
    } else {
      let loader = await this.loadingCtrl.create({
        message: 'Please wait'
      });
      loader.present();

      this.userService.addUser(this.newUser).then((res: any) => {
        loader.dismiss();
        console.log('res', res)
        this.router.navigate(['login']);
      }, (err) => {
        loader.dismiss();
        this.presentToast('Please try again \n' + err);
      });
    };
  }

  goBackToLogin() {
    this.router.navigate(['login']);
  }
}