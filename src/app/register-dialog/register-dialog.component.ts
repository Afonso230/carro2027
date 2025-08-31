import { Component, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-register-dialog',
  standalone: false,
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.css'
})
export class RegisterDialogComponent {

  nome;
  email;
  password;

  hide = signal(true);

  constructor(
  public dialogRef : MatDialogRef<RegisterDialogComponent>,
  private authService : AuthService,
  private userService : UserService
 ){}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  } 

 signUp(){
  if(!this.nome || this.nome===""){
      alert("Obrigatório preencher o nome");
      return;
    } else if(!this.email || this.email==="") {
      alert("Obrigatório preencher o email")
      return;
    } else if(!this.password || this.password===""){
      alert("Obrigatório definir uma password")
      return;
    }
  this.authService.registerUser(this.email,this.password)
  .pipe(
    catchError((error,caught)=>{
      if(error.code === "auth/email-already-in-use"){
        alert("Email já registado!")
        this.dialogRef.close()
      }
      throw error
    })
  )
  .subscribe((user)=>{
    var displayName = this.nome
    var firstName = displayName.substring(0,displayName.indexOf(" "))
    var lastName = displayName.substring(displayName.length - displayName.split("").reverse().join("").indexOf(" "))
    this.userService.registerUser(user.user.uid,firstName + " " + lastName).then(()=>{
      alert("O utlizador foi resgistado. Espera que a comissão te adicione")
      this.dialogRef.close()
    })
  })
 }
}
