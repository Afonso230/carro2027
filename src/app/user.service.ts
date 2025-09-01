import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { map, Observable } from 'rxjs';

export interface User {
  role: string;
  name: string;
  type: number;
  id: string;
  ready? : boolean
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
        if(tempUser.ready)
        {
          userList.push(tempUser)
        }
      }
      return userList
    }))
  }

  getAllInactiveUsers():Observable<User[]>{
    return this.storageService.getData("users").pipe(map(result=>{
      var userList = []
      for(var id in result){
        var tempUser = result[id]
        tempUser["id"] = id
        if(!tempUser.ready)
        {
          userList.push(tempUser)
        }
      }
      return userList
    }))
  }

  getUserInfo(userId):Observable<User>{
    return this.storageService.getData(`users/${userId}`);
  }

  getUserTypeByNumber(type : number){
    return this.usersType[type]
  }

  getAllUserTypes():UserType[]{
    var result = []
    for (var i = 0; i<this.usersType.length ; i++){
      result.push({
        id : i,
        type : this.usersType[i].tipo
      })
    }
    return result
  }

  getNumberByUserType(userType : string){
    for(var i = 0 ; i < this.usersType.length ; i++){
      if(this.usersType[i].tipo === userType) {
        return i
      }
    }
    return -1
  }

  registerUser(id:string , name:string){
    return this.storageService.setData(`users/${id}`,{
      name : name,
      ready : false 
    })
  }

  finishRegistration(id : string, data){
    return this.storageService.setData(`users/${id}`,data)
  }
}
