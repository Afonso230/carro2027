import { Component, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

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
 ){}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  } 

 

 signUp(){
  this.authService.registerUser(this.email,this.password).subscribe((user)=>{
    console.log(user)
  })
 }
}
