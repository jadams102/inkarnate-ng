import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import 'firebase/storage';
import 'firebase/database';
import * as  firebase from 'firebase';
import { Map } from '../models/map.model';
import { Token } from '../models/token.model';
import { MapService } from '../services/map.service';

@Injectable()
export class TokenService {
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
    this.tokens = this.database.list('tokens-master/')
  }

  getMaps() {
    return this.tokens;
  }

  getTokenById(key: string) {
    return this.database.object('tokens-master/' + key);
  }

  updateToken(localUpdatedToken) {
    let tokenEntry = this.getTokenById(localUpdatedToken.key);
    if(localUpdatedToken.name === undefined) {
        localUpdatedToken.name = '';
    }
    if(localUpdatedToken.description === undefined) {
        localUpdatedToken.description = '';
    }
    tokenEntry.update({
      name: localUpdatedToken.name,
      description: localUpdatedToken.description,
    })
  }

  updateTokenPosition(localUpdatedToken) {
    
  }

  removeToken(map) {
    let tokenEntry = this.getTokenById(map.key);
    console.log(tokenEntry);
    tokenEntry.remove();
    this.deleteFile(map.title);
  }

  deleteFile(name) {
    const storageRef = firebase.storage().ref();
    const imgRef = storageRef.child( '/tokens/' + name);
    imgRef.delete()
  }
}
