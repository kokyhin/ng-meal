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
    return this.http.post('/api/auth/register', user);
  }

  login(user: Object) {
    return this.http.post('/api/auth/login', user);
  }

  isAuth() {
    return this.http.get('/api/auth/is-auth');
  }

  logout() {
    this.http.get('/api/auth/logout').subscribe(
      (response) => {
        this.router.navigate(['/signin']);
      }
    );
  }

  reset(email: Object) {
    return this.http.post('/api/auth/reset-password', email);
  }

  passwordUpdate(data: Object) {
    return this.http.put('/api/auth/update-password', data);
  }

}
