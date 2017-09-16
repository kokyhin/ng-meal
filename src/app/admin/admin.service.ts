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

  createOptions(data) {
    return this.http.post('/api/admin/option', data);
  }

  getOptions(date) {
    return this.http.get('/api/admin/option', {params: {date: date}});
  }

  updateOrder(order) {
    return this.http.post('/api/admin/order-update', order);
  }

  notifyUsers(message) {
    return this.http.post('/api/admin/mailing', message);
  }

}
