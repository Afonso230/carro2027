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
  tipo : string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersType : UserType[] = [
    {
      tipo : 'Comissão'
    },
    {
      tipo : 'Comunicação e Imagem'
    },
    {
      tipo : 'Convívios'
    },
    {
      tipo : 'Brindes'
    },
    {
      tipo : 'Jantares de Curso'
    }
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
      return userList
    }))
  }

  getUserTypeByNumber(type : number){
    return this.usersType[type]
  }

  getNumberByUserType(userType : string){
    for(var i = 0 ; i < this.usersType.length ; i++){
      if(this.usersType[i].tipo === userType) {
        return i
      }
    }
    return -1
  }
}
