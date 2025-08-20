import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { map, Observable } from 'rxjs';

export interface User {
  role: string;
  name: string;
  type: number;
  id: string 
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private storageService:StorageService
  ) { }

  getAllUsers():Observable<User[]>{
    return this.storageService.getData("users").pipe(map(result=>{
      var userList = []
      for(var id in result){
        var tempUser = result[id]
        tempUser["id"] = id
        userList.push(tempUser)
      }
      return userList
    }))
  }
}
