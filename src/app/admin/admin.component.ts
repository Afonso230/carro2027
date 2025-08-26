import { Component } from '@angular/core';
import { User, UserService } from '../user.service';
import { MonthQuotas, QuotasService } from '../quotas.service';
import { MatDialog } from '@angular/material/dialog';
import { SeeAccountDialogComponent } from '../see-account-dialog/see-account-dialog.component';
import { log } from 'console';
import { UserMetadata } from '@angular/fire/auth';
import { DialogService } from '../utils/dialog.service';
import { StorageService } from '../storage.service';
import { AddPaymentDialogComponent } from '../add-payment-dialog/add-payment-dialog.component';

export interface UserMonthQuota {
  id : string;
  type : string;
  name : string;
  paymentStatus : boolean;
  paymentDate : Date;
  fine : number;
}

export interface MonthData{
  id: string;
  mes:string;
}

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
}) 
export class AdminComponent {

  meses: any[] = [];
  selectedMonth = "set2025"


  monthCodes = ["set2025","out2025","nov2025","dez2025","jan2026","feb2026","mar2026","abr2026","mai2026","jun2026","jul2026"]
  users: User[];

  usersPayments: UserMonthQuota[];

  valor: number;

  constructor(
    private userService : UserService,
    private quotasService : QuotasService,
    private matDialog: MatDialog,
    private dialogService : DialogService
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
      numeroValue++
    }
  }
  
  getMonthForId(monthId){
    for (var month of this.meses){
      if (month.id === monthId){
        return month
      }
    }
    return null
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
    console.log(this.selectedMonth)
    this.quotasService.getQuotasForMonth(this.selectedMonth).subscribe((quotas) => {
      var usersMonthQuotas : UserMonthQuota[] = [];
      for(var user of this.users){
        var quotaOfUser = this.hasUserPayedQuota(quotas, user.id);
        var quotaPaymentDay = quotaOfUser ? new Date(quotaOfUser) : null
        var userToAdd = {
          id : user.id,
          type : this.userService.getUserTypeByNumber(user.type).tipo, 
          name : user.name,
          paymentStatus : quotaOfUser ? true : false,
          paymentDate : quotaPaymentDay,
          fine : quotaPaymentDay ? this.quotasService.calculateFineForDate(quotaPaymentDay,this.selectedMonth) : null
        }
        usersMonthQuotas.push(userToAdd);
      }
      this.usersPayments = usersMonthQuotas;
      this.valor = quotas.valor
    })
  }

  monthChanged(){
    this.getAllUsers()
  }

  seeAccount(elem:UserMonthQuota) {
    this.matDialog.open(SeeAccountDialogComponent,{
      ...this.dialogService.getGenericDialogConfig(),
      data: {
        id : elem.id,
        name : elem.name,
        type : elem.type,
      }
    });
  }

  addPayment(elem:UserMonthQuota){
    this.matDialog.open(AddPaymentDialogComponent,{
      ...this.dialogService.getGenericDialogConfig(),
      data: {
        id : elem.id,
        name : elem.name,
        month : this.getMonthForId(this.selectedMonth),
        valor :  this.valor
      }
    })
  }

  deletePayment(elem:UserMonthQuota){
    var userConfirm = confirm("Queres apagar o pagamento do utilizador " + elem.name)
    if (userConfirm){
      this.quotasService.deleteQuotaPayment(this.selectedMonth,elem.id)
    }
  }

  applyFilter(event){

  }
}

