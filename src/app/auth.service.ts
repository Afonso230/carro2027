import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated = false
  constructor() { }
  isAutheticated(){
    return this.authenticated
  }
}
