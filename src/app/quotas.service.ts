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
}
