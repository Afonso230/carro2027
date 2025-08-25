import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminComponent, UserMonthQuota } from '../admin/admin.component';


export interface EventDialogData {
  userData : UserMonthQuota;
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
  @Inject(MAT_DIALOG_DATA) public data : UserMonthQuota,
 ){}
}
