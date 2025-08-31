import { Component } from '@angular/core';
import { DialogService } from '../utils/dialog.service';
import { MatDialog} from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email;
  password; 

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

  loginWithEmailAndPassword(){
    if(!this.email || this.email==="") {
      alert("Obrigatório preencher o email")
      return;
    } else if(!this.password || this.password===""){
      alert("Obrigatório colocar password")
      return;
    }
    this.authService.login(this.email,this.password)
    .pipe(
      catchError((error,caught)=>{
        if(error.code === "auth/invalid-credential"){
          alert("Credenciais inválidas")
        }
        throw error
      })
    )
    .subscribe((userData)=>{
      console.log(userData)
      this.userService.getUserInfo(userData.user.uid).subscribe((userData)=>{
        if(!userData){
          alert("Erro interno. Fala com a comissão. Código de erro: 02x410")
        } else if(!userData.ready){
          alert("Esta conta ainda não está ativa! Aguarda que a comissão a ative.")
        } else {
            this.finishLogin()
        }
      })
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
          this.finishLogin()
        }
      })
    })
  }

  finishLogin(){
    this.authService.user$.subscribe((user)=>{
      if(user){
        this.router.navigateByUrl("/quotas")
      }
    })
  }
}