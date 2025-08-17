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
    localStorage.setItem('username', userInfo.username);
    localStorage.setItem('fullname', userInfo.fullName);
    localStorage.setItem('authorities', userInfo.authorities[0]);
  }

  getUserUsername(){
    return localStorage.getItem('username');
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
    localStorage.removeItem('username');
    localStorage.removeItem('fullname');
  }
  constructor() { }
}
