import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import * as  firebase from 'firebase';
import { MapService } from './map.service';
import { Block } from '../models/block.model';

@Injectable()
export class BlockService {
  private uid: string;

  isLoading: boolean = true;

  constructor(private afAuth: AngularFireAuth, private database: AngularFireDatabase, private mapService: MapService) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    });
  }

//   getBlocksByMapId(key: string) {
//     return this.database.object('maps/' + key + '/blocks');
//   }

  updateBlocks(blockAry: Block[], mapKey: string) {
    let mapEntry = this.mapService.getMapById(mapKey);
    mapEntry.update({
        blocks: blockAry
    })
  }

  removeAllBlocks(mapKey) {
    let emptyBlockAry = [];
    let mapEntry = this.mapService.getMapById(mapKey);
    mapEntry.update({
        blocks: emptyBlockAry
    })
  }
}
