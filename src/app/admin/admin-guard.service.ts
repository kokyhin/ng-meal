import { Observable } from 'rxjs/Rx';
import { AuthService } from './../auth/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate() {
    return this.authService.isAuth().map(res => {
      if (res.json().admin) { return true; } else {
        this.router.navigate(['']);
        return false;
      }
    }).catch((err) => {
      this.router.navigate(['']);
      return Observable.of(false);
    });
  }
}
