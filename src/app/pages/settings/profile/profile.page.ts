import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit 
{
  user: any;

  constructor
  (
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit() 
  {
    this.auth.user$.subscribe(user => {
      this.user = user;
    })
  }

  editProfile()
  {
    this.router.navigate(['/home/settings/profile-edit']);
  }
}
