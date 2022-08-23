import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  decodedtoken: any;
  jwttoken = new JwtHelperService; 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var jwt= (JSON.parse(localStorage.getItem("jwttoken") || '{}'));
      var isadmin
      // console.log(jwt, "check token print");
      if (jwt!=null) {
       this.decodedtoken=this.jwttoken.decodeToken(jwt)
      //  console.log("decodec token print:",this.decodedtoken);
      isadmin=this.decodedtoken.Role
      // console.log("isAdmin Value in adminguard:",this.decodedtoken.Role);
      
      return isadmin;
  }
  else return false
  }
}

