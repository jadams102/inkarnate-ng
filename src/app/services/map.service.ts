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

  getMapById(key: string) {
    return this.database.object('maps/' + key);
  }

  updateMap(localUpdatedMap) {
    let mapEntry = this.getMapById(localUpdatedMap.key);
    if(localUpdatedMap.name === undefined) {
      localUpdatedMap.name = '';
    }
    if(localUpdatedMap.description === undefined) {
      localUpdatedMap.description = '';
    }
    mapEntry.update({
      name: localUpdatedMap.name,
      description: localUpdatedMap.description,
      current: localUpdatedMap.current
    })
  }

  updateMapTokens(tokenArray: Token[], mapKey: string) {
    let mapEntry = this.getMapById(mapKey);
    mapEntry.update({
      tokens: tokenArray
    })
  }

  removeMap(map) {
    let imageEntry = this.getMapById(map.key);
    console.log(imageEntry);
    imageEntry.remove();
    this.deleteFile(map.title);
  }

  deleteFile(name) {
    const storageRef = firebase.storage().ref();
    const imgRef = storageRef.child( '/maps/' + name);
    imgRef.delete()
  }
}
