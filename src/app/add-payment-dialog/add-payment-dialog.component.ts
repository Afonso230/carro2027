import { Component, Inject } from '@angular/core';
import { MonthData } from '../admin/admin.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuotasService } from '../quotas.service';

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

  constructor(
    public dialogRef : MatDialogRef<AddPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : AddPaymentData,
    private quotasService : QuotasService
  ){}

  ngOnInit(){
    this.paymentDate = new Date();
    this.updateTotalValue()
  }

  updateTotalValue(){
    this.totalValue = this.data.valor + this.quotasService.calculateFineForDate(this.paymentDate, this.data.month.id)
  }

  dateChanged(){
    this.updateTotalValue()
  }
}

