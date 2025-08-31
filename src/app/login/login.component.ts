import { Component } from '@angular/core';
import { DialogService } from '../utils/dialog.service';
import { MatDialog} from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
  private dialogService : DialogService,
  private matDialog: MatDialog,
  ){}

  openRegisterDialog(){ 
    this.matDialog.open(RegisterDialogComponent,{
      ...this.dialogService.getGenericDialogConfig(),
    })
  }
}