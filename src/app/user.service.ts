import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { map, Observable } from 'rxjs';

export interface User {
  role: string;
  name: string;
  type: number;
  id: string 
}

export interface UserType {
  type : number,
  tipo : string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersType : UserType[] = [
    {
      type : 0,
      tipo : 'Comissão'
    },
    {
      type : 1,
      tipo : 'Convívios'
    },
    {
      type : 2,
      tipo : 'Comunicação e Imagem'
    },
    {
      type : 3,
      tipo : 'Jantares de Curso'
    },
    {
      type : 4,
      tipo : 'Brindes'
    },
  ]
  
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
      console.log(userList)
      return userList
    }))
  }

  getUserTypeByNumber(type : number){
    console.log(this.usersType)
    return this.usersType[type]
  }
}
