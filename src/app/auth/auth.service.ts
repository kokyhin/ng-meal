import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  token: Boolean;

  constructor(
    private http: Http,
    private router: Router
  ) { }

  register(user: Object) {
    return this.http.post('http://localhost:3000/api/auth/register', user);
  }

  login(user: Object) {
    return this.http.post('http://localhost:3000/api/auth/login', user);
  }

  isAuth() {
    if (!this.token) {
      this.http.get('http://localhost:3000/api/auth/is-auth').subscribe(
        (response) => {
          console.log('Auth');
          this.token = true;
          return true;
        },
        (error) => {
          console.log('not');
          this.token = false;
          return false;
        }
      );
    } else {
      return this.token !== false;
    }
  }

  logout() {
    this.http.get('http://localhost:3000/api/auth/logout').subscribe(
      (response) => {
        this.token = null;
        this.router.navigate(['/signin']);
      }
    );
  }

}
