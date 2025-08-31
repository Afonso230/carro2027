import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { QuotasService } from '../quotas.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../user.service';
import { user } from '@angular/fire/auth';
import { DialogService } from '../utils/dialog.service';
import { MatDialog } from '@angular/material/dialog';


export interface UserData {
  id : string,
  name : string,
  type 
}

export interface PaidQuotas {
  month : string,
  paymentDay : Date
  valor : number,
  
}

export interface UnpaidQuota {
  month: string;
  valor: number;
}

@Component({
    selector: 'app-quotas',
    templateUrl: './quotas.component.html',
    styleUrl: './quotas.component.css',
    standalone: false
})
export class QuotasComponent {

  userId = "jaP0FMo7EmNgEHBp0zub1CBqtn52"
  paidQuotas: PaidQuotas[] = [];
  unpaidQuotas : UnpaidQuota[] = [];

  userData : UserData 

  dataSourcePaid ;
  dataSourceUnpaid ;

  displayedColumnsPaid = ['month','valor','paymentDate']

 constructor(
  private quotasService : QuotasService,
  private breakPointObserver : BreakpointObserver,
  private userService : UserService,
 ){
 }

 ngOnInit(){
  this.userService.getUserInfo(this.userId).subscribe((result) => {
    this.userData = result
    this.userData.type = this.userService.getUserTypeByNumber(result.type).tipo
    console.log(this.userData , "informação a usar")
  })

  this.breakPointObserver.observe([Breakpoints.Small,Breakpoints.Handset]).subscribe((result)=>{
      if (result.matches){
        this.displayedColumnsPaid = ['month','paymentDate']
      } else {
        this.displayedColumnsPaid = ['month','valor','paymentDate']
      }
  })

  this.quotasService.getUnpaidQuotasForUser(this.userId).subscribe((value) => {
    for(var quota of value){
      var multa = this.quotasService.calculateFineForDate(new Date(), quota.month)
      var valorTotal = quota.valor + multa
      quota.valor = valorTotal
      quota.month = this.getMonthStringFromMonthCode(quota.month)
    }
    //this.unpaidQuotas = value
    this.dataSourceUnpaid = new MatTableDataSource(this.unpaidQuotas);
    console.log(this.unpaidQuotas, "unpaidQuotas");
  })

  this.quotasService.getPaidQuotasForUser(this.userId).subscribe((value) => {
    for(var quota of value){
      var multa = this.quotasService.calculateFineForDate(quota.paymentDate, quota.month)
      var valorTotal = quota.valor + multa
      quota.valor = valorTotal
      quota.month = this.getMonthStringFromMonthCode(quota.month)
    }
    this.paidQuotas = value
    this.dataSourcePaid = new MatTableDataSource(this.paidQuotas);
    console.log(this.paidQuotas, "paidQuotas");
  })
}

  getMonthStringFromMonthCode(monthCode){
    // month code = out2025
    var ano = parseInt(monthCode.substring(3))
    // ano = 2025
    var monthIndex = this.quotasService.convertThreeCharacterMonthIntoIndex(monthCode.substring(0,3))
    // monthIndex = 9
    var dataAescrever = new Date(ano, monthIndex , 1);
    //dataAescrever = 1 de outubro de 2025
    var stringMes = dataAescrever.toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' });
    //atringMes = outubro de 2025
    var stringMesApresentada = stringMes.charAt(0).toUpperCase() + stringMes.slice(1);
    // Outubro de 2025
    return stringMesApresentada 
  }


}
