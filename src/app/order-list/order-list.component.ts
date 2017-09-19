import { NotificationsService } from 'angular2-notifications';
import { Response } from '@angular/http';
import { OrderService } from './order.service';
import { PreloaderService } from './../core/preloader/preloader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: Object;
  settings: Object;
  constructor(
    private preload: PreloaderService,
    private orderService: OrderService,
    private notify: NotificationsService
  ) { }

  ngOnInit() {
    this.getWeek();
    const activeDay = new Date().getDay() - 1;
    this.settings = {
      items: 1,
      dots: false,
      navigation: false,
      startPosition: (activeDay >= 0 && activeDay < 5) ? activeDay : 0,
      responsive: {
        0: {
          items: 1
        },
        992: {
          items: 5
        }
      }
    };
  }

  preloadClick() {
    this.preload.state.next(true);
    const that = this;
    setTimeout(function() {
      that.preload.state.next(false);
    }, 5000);
  }

  getWeek() {
    this.orderService.getWeek().subscribe(
      (response: Response) => {
        this.orders = response.json();
      },
      (error) => { this.notify.error(error.json().message); }
    );
  }

  getNextWeek() {
    this.orderService.getNextWeek().subscribe(
      (response: Response) => { this.orders = response.json(); },
      (error) => { this.notify.error(error.json().message); }
    );
  }
}
