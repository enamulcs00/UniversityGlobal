import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router){
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          console.log("event--->",event.url)
        }
      })
      if(localStorage.getItem('token')){
        return true;
      }else{
        this.router.navigate(['/login'])
      }
  }
  
}
