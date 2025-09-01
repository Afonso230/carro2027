import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuotasService } from '../quotas.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';


export interface UserData {
  id : string,
  name : string,
  type : number
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
  selector: 'app-see-account-dialog',
  standalone: false,
  templateUrl: './see-account-dialog.component.html',
  styleUrl: './see-account-dialog.component.css'
})

export class SeeAccountDialogComponent {

  paidQuotas: PaidQuotas[] = [];
  unpaidQuotas : UnpaidQuota[] = [];

  dataSourcePaid ;
  dataSourceUnpaid ;

  displayedColumnsPaid = ['month','valor','paymentDate']

 constructor(
  public dialogRef : MatDialogRef<SeeAccountDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data : UserData,
  private quotasService : QuotasService,
  private breakPointObserver : BreakpointObserver
 ){
 }

 ngOnInit(){
  this.breakPointObserver.observe([Breakpoints.Small,Breakpoints.Handset]).subscribe((result)=>{
      if (result.matches){
        this.displayedColumnsPaid = ['month','paymentDate']
      } else {
        this.displayedColumnsPaid = ['month','valor','paymentDate']
      }
  })

  this.quotasService.getUnpaidQuotasForUser(this.data.id).subscribe((value) => {
    for(var quota of value){
      var multa = this.quotasService.calculateFineForDate(new Date(), quota.month)
      var valorTotal = quota.valor + multa
      quota.valor = valorTotal
      quota.month = this.getMonthStringFromMonthCode(quota.month)
    }
    this.unpaidQuotas = value
    this.dataSourceUnpaid = new MatTableDataSource(this.unpaidQuotas);
  })

  this.quotasService.getPaidQuotasForUser(this.data.id).subscribe((value) => {
    for(var quota of value){
      var multa = this.quotasService.calculateFineForDate(quota.paymentDate, quota.month)
      var valorTotal = quota.valor + multa
      quota.valor = valorTotal
      quota.month = this.getMonthStringFromMonthCode(quota.month)
    }
    this.paidQuotas = value
    this.dataSourcePaid = new MatTableDataSource(this.paidQuotas);
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



 fecharDialogo(): void {
    this.dialogRef.close();
  }
}
