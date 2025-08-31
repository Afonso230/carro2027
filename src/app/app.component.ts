import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})
export class AppComponent {
  title = 'carro27';

  opened = false;

  constructor(
    private authService : AuthService,
    private router : Router
  ){}

  logOut(){
    this.authService.logOut().then(()=>{
      this.router.navigateByUrl("/")
      if(this.opened){
        this.triggerNavbar()
      }
    })
  }

  triggerNavbar() {
    this.opened = !this.opened;
  }

  openAtas(){
    alert("Em desenvolvimento")
  }
}
