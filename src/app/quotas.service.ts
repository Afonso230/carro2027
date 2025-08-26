import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { map, Observable } from 'rxjs';

export interface MonthQuotas {
  valor : number;
  pagamentos : any;
}

@Injectable({
  providedIn: 'root'
})
export class QuotasService {

  months = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"]

  constructor(
    private storageService:StorageService
  ) { }

  getQuotasForMonth(month) : Observable<MonthQuotas> {
    return this.storageService.getData(`quotas/${month}`)
  }

  getUnpaidQuotasForUser(user){
    return this.storageService.getData(`quotas`).pipe(map(result=>{
      console.log(result)
      return result
    }))
  }

  convertThreeCharacterMonthIntoIndex(month){
    return this.months.indexOf(month)
  }
  calculateFineForDate(date:Date,month:string){
    var monthIndex = this.convertThreeCharacterMonthIntoIndex(month.substring(0,3))
    var year = parseInt(month.substring(3))
    if( date.getFullYear() < year || (date.getFullYear() == year && date.getMonth() <= monthIndex)){
      return 0
    } else if (date.getFullYear() == year &&
               date.getMonth() == monthIndex + 1 && 
               date.getDate() <= 10){
      return date.getDate()
    } else if (date.getFullYear() == year &&
               date.getMonth() == monthIndex + 1){
      return 10 
    } else {
      return 20
    }
  }
}
