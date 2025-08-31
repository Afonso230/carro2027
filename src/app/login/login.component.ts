import { Component } from '@angular/core';
import { DialogService } from '../utils/dialog.service';
import { MatDialog} from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

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
  private authService : AuthService,
  private userService : UserService,
  private router : Router
  ){}

  openRegisterDialog(){ 
    this.matDialog.open(RegisterDialogComponent,{
      ...this.dialogService.getGenericDialogConfig(),
    })
  }

  loginGoogle(){
    this.authService.logInGoogle().then((user)=>{
      console.log(user)
      this.userService.getUserInfo(user.user.uid).subscribe((userData)=>{
        if (!userData){
          var displayName = user.user.displayName
          var firstName = displayName.substring(0,displayName.indexOf(" "))
          var lastName = displayName.substring(displayName.length - displayName.split("").reverse().join("").indexOf(" "))
          this.userService.registerUser(user.user.uid,firstName + " " + lastName).then(()=>{
            alert("Conta registada. Aguarda que a comissão ative a conta!")
          })
        } else if(!userData.ready){
          alert("Esta conta ainda não está ativa! Aguarda que a comissão a ative.")
        } else {
          this.router.navigateByUrl("/quotas")
        }
      })
    })
  }
}