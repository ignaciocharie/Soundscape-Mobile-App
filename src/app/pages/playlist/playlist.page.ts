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
  lists: Observable<any[]>;
  plays: Observable<any[]>;

  newSong: string = '';
  newSong1: string = '';
  newSong2: string = '';
  itemsRef: AngularFirestoreCollection;
  listsRef: AngularFirestoreCollection;
  playsRef: AngularFirestoreCollection;

  selectedFile: any;
  loading: HTMLIonLoadingElement;

  constructor(private db: AngularFirestore,
    private storage: AngularFireStorage,
    private loadingController: LoadingController) {
    this.itemsRef = db.collection('items')
    this.items = this.itemsRef.valueChanges();
    this.listsRef = db.collection('lists')
    this.lists = this.listsRef.valueChanges();
    this.playsRef = db.collection('plays')
    this.plays = this.playsRef.valueChanges();
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
  addSong1() {
    this.listsRef.add({
      title: this.newSong1
    })
    .then(async resp => {

      const musicUrl = await this.uploadFile(resp.id, this.selectedFile)

      this.listsRef.doc(resp.id).update({
        id: resp.id,
        musicUrl: musicUrl || null
      })
    }).catch(error => {
      console.log(error);
    })
  }
  addSong2() {
    this.playsRef.add({
      title: this.newSong2
    })
    .then(async resp => {

      const songUrl = await this.uploadFile(resp.id, this.selectedFile)

      this.playsRef.doc(resp.id).update({
        id: resp.id,
        songUrl: songUrl || null
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

  async uploadFile1(id, file): Promise<any> {
    if(file && file.length) {
      try {
        await this.presentLoading();
        const task = await this.storage.ref('musics').child(id).put(file[0])
        this.loading.dismiss();
        return this.storage.ref(`musics/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async presentLoading1() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    return this.loading.present();
  }

  async uploadFile2(id, file): Promise<any> {
    if(file && file.length) {
      try {
        await this.presentLoading();
        const task = await this.storage.ref('songs').child(id).put(file[0])
        this.loading.dismiss();
        return this.storage.ref(`songs/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async presentLoading2() {
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
  removes(list){
    console.log(list);
    if(list.musicsUrl) {
      this.storage.ref(`musics/${list.id}`).delete()
    }
    this.listsRef.doc(list.id).delete()
  }
  removess(play){
    console.log(play);
    if(play.songsUrl) {
      this.storage.ref(`songs/${play.id}`).delete()
    }
    this.playsRef.doc(play.id).delete()
  }
}


