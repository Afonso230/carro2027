import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, UserCredential } from '@angular/fire/auth';
import { defer, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated = false
  
  constructor(
    private auth : Auth,
  ) {}
  
  isAutheticated(){
    return this.authenticated
  }

  registerUser(email : string, password : string):Observable<UserCredential>{
    return defer(()=>createUserWithEmailAndPassword(this.auth,email,password))
  }

  login(email : string, password : string):Observable<UserCredential>{
    return defer(()=>signInWithEmailAndPassword(this.auth,email,password))
  }
  
  logInGoogle():Observable<UserCredential>{
    var provider = new GoogleAuthProvider()
    return defer(()=>signInWithPopup(this.auth,provider))
  }
}
