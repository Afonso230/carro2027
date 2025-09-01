import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User, UserCredential } from '@angular/fire/auth';
import { BehaviorSubject, defer, Observable } from 'rxjs';
import { User as UserData, UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user$ = new BehaviorSubject<User | null>(null)
  userData : UserData

  constructor(
    private auth : Auth,
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
  }

  getUserData() : UserData {
    return this.userData;
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
}
