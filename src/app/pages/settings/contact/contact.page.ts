import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {

  constructor(public composer:EmailComposer) 
  {

   }

  OpenEmailComposer()
  {
    this.composer.open({
      to:'soundscape.mobileapp@gmail.com'
    })
  }

}
