import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage {
  items: Observable<any[]>;

  newSong: string = '';
  itemsRef: AngularFirestoreCollection;

  selectedFile: any;
  loading: HTMLIonLoadingElement;

  constructor(private db: AngularFirestore,
    private storage: AngularFireStorage,
    private loadingController: LoadingController) {
    this.itemsRef = db.collection('items')
    this.items = this.itemsRef.valueChanges();
  }

  chooseFile (event) {
    this.selectedFile = event.target.files
  }

  addSong() {
    this.itemsRef.add({
      title: this.newSong
    })
    .then(async resp => {

      const audioUrl = await this.uploadFile(resp.id, this.selectedFile)

      this.itemsRef.doc(resp.id).update({
        id: resp.id,
        audioUrl: audioUrl || null
      })
    }).catch(error => {
      console.log(error);
    })
  }
 
  async uploadFile(id, file): Promise<any> {
    if(file && file.length) {
      try {
        await this.presentLoading();
        const task = await this.storage.ref('audios').child(id).put(file[0])
        this.loading.dismiss();
        return this.storage.ref(`audios/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    return this.loading.present();
  }

  remove(item){
    console.log(item);
    if(item.audiosUrl) {
      this.storage.ref(`audios/${item.id}`).delete()
    }
    this.itemsRef.doc(item.id).delete()
  }
}
