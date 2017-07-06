import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  token: null;

  constructor(private http: Http) { }

  register(user: Object) {
    return this.http.post('http://localhost:3000/api/auth/register', user);
  }

  login(user: Object) {
    return this.http.post('http://localhost:3000/api/auth/login', user);
  }

  isAuth() {
    return this.token != null;
  }

  logout() {
    this.http.get('http://localhost:3000/api/auth/logout').subscribe(
      (response) => { this.token = null; }
    );
  }

}
