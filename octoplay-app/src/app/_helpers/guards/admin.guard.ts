import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) {  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const idRole = this.auth.getUserRole();
        if(idRole == 2){
          console.log('Ok Guard');
        return true;
        } else {
        console.log('NOk Guard');
        this.router.navigate(['/connexion']);
        return false;
      } 
  }
  
}
