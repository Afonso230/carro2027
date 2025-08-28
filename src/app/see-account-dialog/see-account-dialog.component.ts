import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuotasService } from '../quotas.service';


export interface UserData {
  id : string,
  name : string,
  type : number
}

@Component({
  selector: 'app-see-account-dialog',
  standalone: false,
  templateUrl: './see-account-dialog.component.html',
  styleUrl: './see-account-dialog.component.css'
})

export class SeeAccountDialogComponent {

 constructor(
  public dialogRef : MatDialogRef<SeeAccountDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data : UserData,
  private quotasService : QuotasService
 ){
  console.log(data.name)
 }

 ngOnInit(){
  this.quotasService.getUnpaidQuotasForUser(this.data.id).subscribe((value) => {
    console.log(value);
  })
  this.quotasService.getPaidQuotasForUser(this.data.id).subscribe((value) => {
    console.log(value);
  })
 }

 fecharDialogo(): void {
    this.dialogRef.close();
  }
}
