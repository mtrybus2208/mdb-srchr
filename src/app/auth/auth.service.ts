import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { UserFavoriteFilm } from './../shared/models/user-favorite-film.model';

@Injectable()
export class AuthService{
 
  authState: any = null;
  usersCollection: AngularFirestoreCollection<any>;
  favoriteFilms$: BehaviorSubject<any> = new BehaviorSubject(null);  
  
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) { 
    /* 
    ** Subscribe to the every authState change
    ** the next method in observer starts when the user is loggIn or loggOut
    */
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
      // if user is not logged pass the null to BehaviorSubject
      if(auth == null) return this.favoriteFilms$.next(null);
      this.usersCollection.doc(`${ this.authState.uid}`).valueChanges().subscribe((filmsArr)=>{
        this.favoriteFilms$.next(filmsArr);
      })
    });
    //  Return AngularFirestoreCollection wchich is a wrapper around the native Firestore SDK's CollectionReference
    this.usersCollection = this.afs.collection<any>('users');
  }

  // Add to Firestore field -> filmId, this field is used in (user.component) to retrieve films info from mdb API
  addFavoriteFilms(filmId:any, par:any): void {
    const obj = {};
    const filmDetails: UserFavoriteFilm = {
      title: par.title,
      date: par.releaseDate, 
      desc: par.overview,
      imgPath: par.posterPath
    }
    obj[`favoriteFilms.${filmId}`] = filmDetails;
    this.usersCollection.doc(`${ this.authState.uid}`).update( obj );
    // console.log("added") //uncomment to debug
  }
  /* 
  ** Remove from Firestore field -> filmId
  ** used in (details.component / user.component)
  ** firebase.firestore.FieldValue.delete() is a FireStore own API method to delete fields
  */
  removeFavoriteFilms(filmId:any): void {
    const obj = {};
    obj[`favoriteFilms.${filmId}`] = firebase.firestore.FieldValue.delete();
    this.usersCollection.doc(`${ this.authState.uid}`).update( obj );
    // console.log("deleted") //uncomment to debug
  }
 // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }
  // Returns the current user Profile from Firestore db as an Observable from valueChanges() method
  get currentUserDoc():any {
    return this.authenticated ? this.usersCollection.doc(`${ this.authState.uid}`).valueChanges()  : null;
  }
  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }
  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
    // Returns Observable
  get currentUserObservable(): any {
    return this.afAuth.authState
  }
  // Function to register user in Firestore
  // Used in (registration.component)
  registerByMail(email: string, password: string, userName:string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      this.authState = user; 
      this.router.navigate(['']);
      this.setUserData(email, userName);
    })
    .catch(error => console.log(error));
  }
  // Function to login user in Firestore
  // Used in (login.component)
  loginByMail(email: string, password: string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user)
      this.authState = user; 
      this.router.navigate(['']); 
    })
    .catch(error => console.log(error));
  }
  // Function to logOut user, emit a value in this.afAuth.authState obervable
  // Used in (user.component)
  logOut(){
    this.afAuth.auth.signOut();
    this.router.navigate(['auth/login']);
  }
  private setUserData(email: string, userName:string): void {
    const userProfile$ = this.usersCollection.doc(this.currentUserId).snapshotChanges();
     userProfile$.subscribe((profile)=>{
      //  check if the document with current user iD is in the Firestore DB, id is not create that doc
       if(!profile.payload.exists){     
        this.usersCollection.doc(this.currentUserId).set({
          email: email,
          name: userName,
          favoriteFilms: {}
        })//  set
       }//  if
     })//  subscribe
  }
  /* Social Login/Register methods */
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }
  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  } 
  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
        this.authState = credential.user;
        this.setUserData(this.authState.email, this.authState.displayName);
        this.currentUserObservable.subscribe((state)=>{ 
          (state) ?  this.router.navigate(['']) : this.router.navigate(['auth/login']);
         });
      })
      .catch(error => console.log(error));
  }
}
