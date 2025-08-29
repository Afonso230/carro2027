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

  isUserInPayments(userId, payments){
    for(var userIdQuotas in payments){
      if(userIdQuotas === userId){
        return payments[userIdQuotas].data;
      }
    }
    return null;
  }

  getUnpaidQuotasForUser(user){
    return this.storageService.getData(`quotas`).pipe(map(quotas=>{
      var calculatedQuotas = [];
      for(var month in quotas){
        var monthPayments = quotas[month]["pagamentos"];
        if(!this.isUserInPayments(user, monthPayments)){
          calculatedQuotas.push({
            month: month,
            valor: quotas[month]["valor"]
          })
        }
      }
      calculatedQuotas.sort((quota1, quota2) => {
        var month1 = this.convertThreeCharacterMonthIntoIndex(quota1.month.substring(0,3));
        var year1 = quota1.month.substring(3);
        var month2 = this.convertThreeCharacterMonthIntoIndex(quota2.month.substring(0,3));
        var year2 = quota2.month.substring(3);
        if(year1 < year2){
          return -1;
        }else if(year1 > year2){
          return 1;
        }else if(month1 < month2){
          return -1;
        }else if(month2 > month1){
          return 1;
        }else{
          return 0;
        }
      })
      return calculatedQuotas
    })) 
  }

  getPaidQuotasForUser(user){
    return this.storageService.getData(`quotas`).pipe(map(quotas=>{
      var calculatedQuotas = [];
      for(var month in quotas){
        var monthPayments = quotas[month]["pagamentos"];
        var paymentDate = this.isUserInPayments(user, monthPayments)
        if(paymentDate){
          calculatedQuotas.push({
            month: month,
            valor: quotas[month]["valor"],
            paymentDate: new Date(paymentDate)
          })
        }
      }
      calculatedQuotas.sort((quota1, quota2) => {
        var month1 = this.convertThreeCharacterMonthIntoIndex(quota1.month.substring(0,3));
        var year1 = quota1.month.substring(3);
        var month2 = this.convertThreeCharacterMonthIntoIndex(quota2.month.substring(0,3));
        var year2 = quota2.month.substring(3);
        if(year1 < year2){
          return -1;
        }else if(year1 > year2){
          return 1;
        }else if(month1 < month2){
          return -1;
        }else if(month2 > month1){
          return 1;
        }else{
          return 0;
        }
      })
      return calculatedQuotas
    })) 
  }

  setQuotaPayment(month : string, userId : string, paymentDate : number){
    return this.storageService.setData(`quotas/${month}/pagamentos/${userId}`,{
      data : paymentDate
    })
  }

  deleteQuotaPayment(month : string, userId : string){
    return this.storageService.deleteData(`quotas/${month}/pagamentos/${userId}`)
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
