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

  showNavbar = false;
  admin = false;

  constructor(
    private authService : AuthService,
    private router : Router
  ){}

  ngOnInit() {
    this.checkAuthentication()
  }

  logOut(){
    this.authService.logOut().then(()=>{
      this.router.navigateByUrl("/")
      if(this.opened){
        this.triggerNavbar()
      }
      this.checkAuthentication()
    })
  }

  checkAuthentication() {
    this.authService.user$.subscribe((user) => {
      if(user){
        if(this.authService.getUserData()?.role === "admin"){
          this.admin = true;
        }
        this.showNavbar = true;
      }else{
        this.showNavbar = false;
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
