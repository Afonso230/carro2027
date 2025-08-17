import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  setUserAndToken(userInfo, token, expiration){
    const expiresAt = moment().add(expiration, 'second');

    localStorage.setItem('token', token);
    localStorage.setItem('expiration', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('userID', userInfo.userID);
    localStorage.setItem('fullname', userInfo.fullName);
    localStorage.setItem('authorities', userInfo.authorities[0]);
  }

  getUserID(){
    return localStorage.getItem('userID');
  }

  getUserFullName(){
    return localStorage.getItem('fullname');
  }

  getAuthority(){
    return localStorage.getItem('authorities');
  }

  isLoggedIn(){
    return localStorage.getItem('token');
  }
  
  hasValidToken(){
    return this.isLoggedIn() && moment().isBefore(this.getExpiration());
  }

  getExpiration(): moment.MomentInput {
    const expiration = localStorage.getItem('expiration')!;
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userID');
    localStorage.removeItem('fullname');
  }
  constructor() { }
}
