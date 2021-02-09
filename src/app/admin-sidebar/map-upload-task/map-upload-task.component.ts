import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import * as  firebase from 'firebase';
import { Map } from '../../models/map.model';


@Component({
  selector: 'map-upload-task',
  templateUrl: './map-upload-task.component.html',
  styleUrls: ['./map-upload-task.component.scss']
})
export class MapUploadTaskComponent implements OnInit {

  @Input() upload: Map;
  @Input() basePath: string;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {
    const storageRef = firebase.storage().ref();
    // The storage path
    const fullPath = `maps/${this.upload.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(fullPath);

    // The main task
    this.task = this.storage.upload(fullPath, this.upload.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
      storageRef.child(fullPath).getDownloadURL().then(url => {
          this.upload.url = url;
          this.downloadURL = url;
          this.upload.title = this.upload.file.name;
          console.log(this.upload);
          this.db.list(`maps/`).push(this.upload);
        });
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}