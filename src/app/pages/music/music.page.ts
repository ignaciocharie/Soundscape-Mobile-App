import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';


@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit {
  @ViewChild("range", {static: false}) range: IonRange;
  constructor() { }

  ngOnInit() {
  }
}
