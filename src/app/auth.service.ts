import { Injectable } from '@angular/core';
import { Auth, browserLocalPersistence, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User, UserCredential } from '@angular/fire/auth';
import { BehaviorSubject, defer, Observable } from 'rxjs';
import { User as UserData, UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user$ = new BehaviorSubject<User | null>(null)
  userData : UserData
  ready = false;

  constructor(
    public auth : Auth,
    private userService : UserService
  ) {
    onAuthStateChanged(this.auth,(user)=>{
      if(user){
        this.userService.getUserInfo(user.uid).subscribe((userInfo) => {
          this.userData = userInfo;
          this.user$.next(user)
        })
      }else{
        this.userData = null
        this.user$.next(user)
      }
    })
    auth.authStateReady().then(() => {
      this.ready = true;
    })
  }

  getUserData() : Promise<UserData> {
    return new Promise<UserData>(resolve => {
      const check = () => {
        if (this.userData || this.ready) {
          resolve(this.userData);
        } else {
          // re-check after a short delay
          setTimeout(check, 50);
        }
      }
      check()
    })
  }

  registerUser(email : string, password : string):Observable<UserCredential>{
    return defer(()=>createUserWithEmailAndPassword(this.auth,email,password))
  }

  login(email : string, password : string):Observable<UserCredential>{
    return defer(()=>signInWithEmailAndPassword(this.auth,email,password))
  }
  
  logOut(){
    this.userData = null;
    return signOut(this.auth)
  }
  
  logInGoogle():Promise<UserCredential>{
    var provider = new GoogleAuthProvider()
    return signInWithPopup(this.auth,provider)
  }

  updateUserProfile(displayName){
    return updateProfile(this.auth.currentUser, {
      displayName: displayName
    })
  }
}
