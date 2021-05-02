import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
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
  basePath: string;
  isLoading: boolean = true;

  constructor(private afAuth: AngularFireAuth, private database: AngularFireDatabase, private storage: AngularFireStorage) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    });
    this.tokens = this.database.list('tokens-master/')
    this.basePath = 'tokens-master/'
  }

  getTokens() {
    return this.tokens;
  }

  getTokenById(key: string) {
    return this.database.object('tokens-master/' + key);
  }

  uploadToken(token: Token) {
    const storageRef = firebase.storage().ref();
    const fullPath = `${this.basePath}/${token.file.name}`
    const uploadTask = storageRef.child(fullPath).put(token.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
      token.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      console.log(token.progress);
    },

    (error) => {
      console.log(error);
    },

    ():any => {
        storageRef.child(fullPath).getDownloadURL().then(url => {
        token.url = url;
        token.title = token.file.name;
        this.database.list(`tokens-master/`).push(token);
      })
    })
  };
  
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
      size: localUpdatedToken.size,
      sizeString: localUpdatedToken.sizeString
    })
  }

  removeToken(token) {
    let tokenEntry = this.getTokenById(token.key);
    tokenEntry.remove();
    this.deleteFile(token.title);
  }

  deleteFile(key) {
    const storageRef = firebase.storage().ref();
    const imgRef = storageRef.child( '/tokens/' + key);
    imgRef.delete()
  }
}
