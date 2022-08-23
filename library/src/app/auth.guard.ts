import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  jwttoken = new JwtHelperService;
  helper: Object | null | undefined;
  myHeaders = new Headers();
  decodedtoken: any;
  router!: Router;

  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var jwt = (JSON.parse(localStorage.getItem("jwttoken") || '{}'));
    //  console.log(jwt, "check token print");
    if  (localStorage.getItem("jwttoken")!=null) {
      this.decodedtoken = this.jwttoken.decodeToken(jwt)
      // console.log("decodec token print:", this.decodedtoken);
      var currentTimestamp = new Date().getTime() / 1000;
      var tokenIsNotExpired = this.decodedtoken.exp > currentTimestamp;
      if (tokenIsNotExpired) {
        return true;
      } else {
        this.router.navigate(['/login'])
        return false
      }

    } else{
      this.router.navigate(['/login'])
      return false
    }
   
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
