import { Component, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

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
  this.authService.registerUser(this.email,this.password).subscribe((user)=>{
    console.log(user)
    var displayName = user.user.displayName
    var firstName = displayName.substring(0,displayName.indexOf(" "))
    var lastName = displayName.substring(displayName.length - displayName.split("").reverse().join("").indexOf(" "))
    this.userService.registerUser(user.user.uid,firstName + " " + lastName)
  })
 }

 
}
