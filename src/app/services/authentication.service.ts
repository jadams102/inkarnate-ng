import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  private user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
   }

   login(user: User){
     return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
   }

   logout(){
     return this.afAuth.signOut();
   }

   authUser(){
     return this.user; 
   }
   
}
