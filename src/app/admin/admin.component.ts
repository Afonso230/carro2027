import { Component } from '@angular/core';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
}) 
export class AdminComponent {

  meses: any[] = [];
  selectedMonth: any;
  monthCodes = ["set2025","out2025","nov2025","dez2025","jan2026","feb2026","mar2026","abr2026","mai2026","jun2026","jul2026"]
  users: User[]

  constructor(
    private userService : UserService
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
    console.log(this.meses);
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((result)=>{
      this.users=result
    })
  }
}

