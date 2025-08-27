import { Component, Inject } from '@angular/core';
import { MonthData } from '../admin/admin.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuotasService } from '../quotas.service';
import { AgChartOptions } from 'ag-charts-community';

export interface AddPaymentData {
  id : string,
  name : string,
  month : MonthData ,
  valor : number,
}

@Component({
  selector: 'app-add-payment-dialog',
  standalone: false,
  templateUrl: './add-payment-dialog.component.html',
  styleUrl: './add-payment-dialog.component.css'
})
export class AddPaymentDialogComponent {
  
  paymentDate : Date;
  today = new Date();
  totalValue :number;
  chartOptions : AgChartOptions

  constructor(
    public dialogRef : MatDialogRef<AddPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : AddPaymentData,
    private quotasService : QuotasService
  ){}

  ngOnInit(){
    this.paymentDate = new Date();
    this.updateTotalValue()
    this.updateChart()
  }

  updateTotalValue(){
    this.totalValue = this.data.valor + this.quotasService.calculateFineForDate(this.paymentDate, this.data.month.id)
  }

  updateChart(){
    this.chartOptions = {
      data: [
        {amount : this.data.valor, source : "valor base"},
        {amount : this.totalValue - this.data.valor, source : "multa"}
      ],
      series :[
        {
          type : "pie",
          angleKey : "amount",
          calloutLabelKey : "source",
          sectorLabelKey : "amount",
          sectorLabel : {
            color : "white",
            fontWeight : "bold"
          }
        }
      ]
    }
  }

  dateChanged(){
    this.updateTotalValue()
    this.updateChart()
  }

  addPayment(){
    this.quotasService.setQuotaPayment(this.data.month.id,this.data.id,this.paymentDate.getTime()).then(()=>{
      this.dialogRef.close()
    })
  }

}

