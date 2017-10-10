import { NotificationsService } from 'angular2-notifications';
import { Response } from '@angular/http';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import 'remodal';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {
  week: any;
  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  totals = [];
  activeDay = 0;
  orderView = {
    user: '',
    first: {
      value: 0,
      option: ''
    },
    second: {
      value: 0,
      option: ''
    },
    total: 0
  };
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
      (response: Response) => {
        this.week = response.json();
        this.getTotals(response.json());
      },
      (error) => { this.notify.error(error.json().message); }
    );
  }

  getTotals(week) {
    const totals = [];
    for (const day of week) {
      const totalDay = {
        total: 0,
        first: 0,
        second: 0,
        debt: ''
      };
      let debt = 0;
      for (const order of day) {
        totalDay.total += order.total;
        totalDay.first += order.first.value;
        totalDay.second += order.second.value;
        if (!order.payed) {
          debt += order.total;
        }
      }
      totalDay.debt = `${totalDay.total - debt}/${debt}`;
      totals.push(totalDay);
    }
    this.totals = totals;
  }

  openOrder(order) {
    this.orderView = order;
  }

  updatePayed(order) {
    order.payed = !order.payed;
    this.adminService.updateOrder(order).subscribe(
      (response: Response) => {
        this.getTotals(this.week);
      },
      (error) => { this.notify.error(error.json().message); }
    );
  }
}
