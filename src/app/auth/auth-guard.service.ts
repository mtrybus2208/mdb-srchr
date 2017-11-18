import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor( private authSerivice: AuthService, private router: Router ) { }
  
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
    if(this.authSerivice.authenticated){
      return true
    }else{
      this.router.navigate(['home']);
      return false
    } 
  }
}

