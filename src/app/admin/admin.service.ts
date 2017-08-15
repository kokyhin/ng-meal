import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class AdminService {

  constructor(
    private http: Http,
    private router: Router
  ) { }

  getOrdersWeek() {
    return this.http.get('/api/order/week-orders');
  }

}
