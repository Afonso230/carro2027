import { Component } from '@angular/core';
import { User, UserService } from '../user.service';
import { MonthQuotas, QuotasService } from '../quotas.service';
import { MatDialog } from '@angular/material/dialog';
import { SeeAccountDialogComponent } from '../see-account-dialog/see-account-dialog.component';
import { log } from 'console';
import { UserMetadata } from '@angular/fire/auth';

export interface UserMonthQuota {
  id : string;
  type : string;
  name : string;
  paymentStatus : boolean;
  paymentDate : Date;
  fine : number;
}

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
}) 
export class AdminComponent {

  meses: any[] = [];
  selectedMonth: {id: string, mes:string} = {id: "set2025", mes: "Setembro 2025"};
  monthCodes = ["set2025","out2025","nov2025","dez2025","jan2026","feb2026","mar2026","abr2026","mai2026","jun2026","jul2026"]
  users: User[];

  usersPayments: UserMonthQuota[];

  constructor(
    private userService : UserService,
    private quotasService : QuotasService,
    private matDialog: MatDialog,
  ){}

  ngOnInit() {
    this.gerarMeses();
    this.getAllUsers()
  }

  gerarMeses() {
    var hoje = new Date();

    var ultimoAno = 2026;
    var ultimoMes = 6; 
    var numeroValue = 0

    var ultimaData = new Date(ultimoAno, ultimoMes + 1, 1);
  
    for (
      var dataAescrever = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 1); 
      dataAescrever < ultimaData;
      dataAescrever.setMonth(dataAescrever.getMonth() + 1)
    ) {
      var stringMes = dataAescrever.toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' });
      var stringMesApresentada = stringMes.charAt(0).toUpperCase() + stringMes.slice(1);   

      this.meses.push({
        id: this.monthCodes[numeroValue],
        mes: stringMesApresentada
      });
    }
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((result)=>{
      this.users=result
      this.getAllUsersQuotas();
    })
  }

  hasUserPayedQuota(quotas, userId){
    for(var userIdQuotas in quotas.pagamentos){
      if(userIdQuotas === userId){
        return quotas.pagamentos[userIdQuotas].data;
      }
    }
    return null;
  }

  getAllUsersQuotas() {
    this.quotasService.getQuotasForMonth(this.selectedMonth.id).subscribe((quotas) => {
      var usersMonthQuotas : UserMonthQuota[] = [];
      for(var user of this.users){
        var quotaOfUser = this.hasUserPayedQuota(quotas, user.id);
        var userToAdd = {
          id : user.id,
          type : user.type + '', // TODO: trocar por função (no user service) que obtem o tipo de utilizador pelo numero
          name : user.name,
          paymentStatus : quotaOfUser ? true : false,
          paymentDate : new Date(quotaOfUser),
          fine : 0
        }
        usersMonthQuotas.push(userToAdd);
      }
      this.usersPayments = usersMonthQuotas;
    })
  }

  seeAccount(elem:UserMonthQuota) {
    this.matDialog.open(SeeAccountDialogComponent,{
      data: {
        userData : elem
      }
    });
  }

  addPayment(elem){

  }

  deletePayment(elem){

  }
}

