import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User, UserCredential } from '@angular/fire/auth';
import { BehaviorSubject, defer, Observable } from 'rxjs';
import { User as UserData, UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated = false
  
  user$ = new BehaviorSubject<User | null>(null)
  userData : UserData

  constructor(
    private auth : Auth,
    private userService : UserService
  ) 
  {

  onAuthStateChanged(this.auth,(user)=>{
    this.user$.next(user)
  })
  }
  
  isAutheticated(){
    return this.authenticated
  }

  registerUser(email : string, password : string):Observable<UserCredential>{
    return defer(()=>createUserWithEmailAndPassword(this.auth,email,password))
  }

  login(email : string, password : string):Observable<UserCredential>{
    return defer(()=>signInWithEmailAndPassword(this.auth,email,password))
  }
  
  logOut(){
    return signOut(this.auth)
  }
  
  logInGoogle():Promise<UserCredential>{
    var provider = new GoogleAuthProvider()
    return signInWithPopup(this.auth,provider)
  }
}
