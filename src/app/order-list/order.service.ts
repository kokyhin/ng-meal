import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class OrderService {

  constructor(
    private http: Http,
    private router: Router
  ) { }

  getWeek() {
    return this.http.get('/api/order/get-week');
  }

  getNextWeek() {
    return this.http.get('/api/order/get-next-week');
  }

}
