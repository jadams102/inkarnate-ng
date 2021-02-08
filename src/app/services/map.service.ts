import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import 'firebase/storage';
import 'firebase/database';
import * as  firebase from 'firebase';
import { Map } from '../models/map.model';
import { Token } from '../models/token.model';

@Injectable()
export class MapService {
  private uid: string;
  maps: AngularFireList<Map>;
  tokens: AngularFireList<Token>;

  isLoading: boolean = true;

  constructor(private afAuth: AngularFireAuth, private database: AngularFireDatabase) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    });
    this.maps = this.database.list('maps/');
  }

  getMaps() {
    return this.maps;
  }

  deleteMap(mapKey: string) {
    const mapToDelete = this.database.list('maps/' + mapKey + '/');
    mapToDelete.remove();

  }

  getMapById(key: string) {
    return this.database.object('maps/' + key);
  }

  updateImage(localUpdatedMap) {
    let mapEntry = this.getMapById(localUpdatedMap.key);
    mapEntry.update({
      name: localUpdatedMap.name,
      description: localUpdatedMap.description
    })
    alert("Image Updated!")
  }

  removeMap(map) {
    let imageEntry = this.getMapById(map.key);
    imageEntry.remove();
    this.deleteFile(map.title);
  }

  deleteFile(name) {
    const storageRef = firebase.storage().ref();
    const imgRef = storageRef.child( '/maps/' + name);
    imgRef.delete()
  }
}
