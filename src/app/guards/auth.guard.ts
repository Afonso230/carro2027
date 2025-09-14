import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';
import { TokenService } from '../token.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return Promise.all([this.authService.auth.authStateReady() ]).then(() => {
        return this.authService.getUserData().then((user) => {
          if(user && user?.ready){
            return true;
          }
          this.router.navigate(['login'], {queryParams: {returnUrl : state.url}});
          return false;
        })
      })

      /*console.log(this.authService.user$.value)
      
      await this.authService.auth.authStateReady();

      console.log(this.authService.user$.value)

      const user = await firstValueFrom(this.authService.user$);
      if(user && this.authService.getUserData()?.ready){
        return true;
      }
      this.authService.logOut();
      this.router.navigate(['login'], {queryParams: {returnUrl : state.url}});
      return false;*/
  }
  
}
