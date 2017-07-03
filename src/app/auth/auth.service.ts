import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  register(user: Object) {
    return this.http.post('http://localhost:3000/api/auth/register', user);
  }
}
