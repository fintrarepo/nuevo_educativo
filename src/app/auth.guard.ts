import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.auth.token.pipe(
      take(1)
    ).pipe(
      map((user: any) => {
        console.log(user)
        return !!user;
      })
    ).pipe(
      tap((autenticated: boolean) => {
        if (!autenticated) this.router.navigate(['/login'])
      })
    )
  }
}


@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //   console.log(localStorage.getItem('user'))
    // if (localStorage.getItem('user') != null) {
    //   this.router.navigate(['/app/dashboard/requests?referidos=true'])
    //   return false;
    // }
    
    return true;

  }
}
