import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import * as  firebase from 'firebase';
import { Token } from '../../models/token.model';


@Component({
  selector: 'token-upload-task',
  templateUrl: './token-upload-task.component.html',
  styleUrls: ['./token-upload-task.component.scss']
})
export class TokenUploadTaskComponent implements OnInit {

  @Input() upload: Token;

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
    const fullPath = `tokens-master/${this.upload.file.name}`;

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
          this.db.list(`tokens-master/`).push(this.upload);
        });
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}