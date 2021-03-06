import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuth().map(e => {
      if (e) {
        this.authService.setAdmin(e.json().admin);
        return true;
      }}).catch((err) => {
        this.router.navigate(['/signin']);
        return Observable.of(false);
      });
  }
}
