import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
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
    return this.http.get('http://localhost:3000/api/auth/is-auth');
  }

  logout() {
    this.http.get('http://localhost:3000/api/auth/logout').subscribe(
      (response) => {
        this.router.navigate(['/signin']);
      }
    );
  }

}
