import { Component, Inject } from '@angular/core';
import { UserService, UserType } from '../user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface CompleteRegisterUserDialofData{
  id : string;
  name : string
}

@Component({
  selector: 'app-complete-register-dialog',
  standalone: false,
  templateUrl: './complete-register-dialog.component.html',
  styleUrl: './complete-register-dialog.component.css'
})
export class CompleteRegisterDialogComponent {



  userTypes
  type
  role

  constructor(
    private userService : UserService,
    public dialogRef : MatDialogRef<CompleteRegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : CompleteRegisterUserDialofData,
  ){}

  ngOnInit(){
    this.userTypes = this.userService.getAllUserTypes()
  }

  finishRegister(){
    this.userService.finishRegistration(this.data.id,{
      type : this.type,
      ready : true,
      role : this.role,
      name : this.data.name
    }).then(()=>{
      this.dialogRef.close()
    })
  }
}
