import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

export interface AccountBalance {
  income : number;
  expenses : number;
  handTotal : number;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private storageService : StorageService,
  ) { }

  getAccountBalance(): Observable<AccountBalance>{
    return this.storageService.getData(`balance`) 
  }

  setIncomeValue(value){
    return this.storageService.setData(`balance/income`, value)
  }

  setExpensesValue(value){
    return this.storageService.setData(`balance/expenses`, value)
  }

  setHandValue(value){
    return this.storageService.setData(`balance/handTotal`, value)
  }
}
