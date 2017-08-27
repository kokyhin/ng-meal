import { NotificationsService } from 'angular2-notifications';
import { Response } from '@angular/http';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {
  week: any;
  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  activeDay = 0;
  constructor(
    private adminService: AdminService,
    private notify: NotificationsService,
  ) { }

  ngOnInit() {
    this.getWeek();
    this.getActiveTab();
  }

  getActiveTab() {
    const day = new Date().getDay();
    if (day > this.days.length || !day) {
      this.activeDay = 0;
    } else {
      this.activeDay = day - 1;
    }
  }

  onDayClick(i) {
    this.activeDay = i;
  }

  getWeek() {
    this.adminService.getOrdersWeek().subscribe(
      (response: Response) => { this.week = response.json(); console.log(this.week); },
      (error) => { this.notify.error(error.json().message); }
    );
  }

  openOrder(order) {
    console.log('Open order clicked');
  }

  updatePayed(order) {
    order.payed = !order.payed;
    this.adminService.updateOrder(order).subscribe(
      (response: Response) => {},
      (error) => { this.notify.error(error.json().message); }
    );
  }
}
