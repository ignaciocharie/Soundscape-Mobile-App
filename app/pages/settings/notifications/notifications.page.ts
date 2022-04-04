import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  self = false;
  journal = false;

  onChange() {
    if (this.self) {
      this.selfOn();
    }
    else {
      this.selfOff()
    }
  }

  onSwitch() {
    if (this.journal) {
      this.journalOn();
    }
    else {
      this.journalOff()
    }
  }

  selfOn() {
    console.log("Self care reminder has been turned on!");
  }

  selfOff() {
    console.log("Self care reminder has been turned off!");
  }

  journalOn() {
    console.log("Journal reminder has been turned on!");
  }
  journalOff() {
    console.log("Journal reminder has been turned off!");
  }

}
