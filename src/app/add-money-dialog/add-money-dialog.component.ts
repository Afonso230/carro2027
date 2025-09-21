import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface AddMoneyDialogComponentData{
  value : number
  title : string
  type : string
}

@Component({
  selector: 'app-add-money-dialog',
  standalone: false,
  templateUrl: './add-money-dialog.component.html',
  styleUrl: './add-money-dialog.component.css'
})
export class AddMoneyDialogComponent {

  valorAdicionar : number
  handAction : number

  constructor(
    public dialogRef : MatDialogRef<AddMoneyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : AddMoneyDialogComponentData,
  ){}
  
  fecharDialogo(): void {
    this.dialogRef.close();
  }

  finishAdding(){
    this.dialogRef.close(this.valorAdicionar)
  }
}
