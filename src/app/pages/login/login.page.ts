import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit 
{
  email: string;
  password: string;

  showPassword = false;
  passwordToggleIcon = 'eye';
  
  constructor(
    private auth: AuthService,
    private toaster: ToastController) { }

    togglePassword(): void {
      this.showPassword = !this.showPassword;

      if(this.passwordToggleIcon == 'eye') {
        this.passwordToggleIcon = 'eye-off';
      } else {
        this.passwordToggleIcon = 'eye';
      }
    }

  ngOnInit() {
  }

  login()
  {
    if(this.email && this.password)
    {
      this.auth.signIn(this.email, this.password);
      this.toast('Welcome to Soundscape!', 'primary');
    } else {
      this.toast('Please enter your email & password!', 'warning');
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