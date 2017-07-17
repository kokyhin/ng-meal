import { NotificationsService } from 'angular2-notifications';
import { Response } from '@angular/http';
import { OrderService } from './order.service';
import { PreloaderService } from './../core/preloader/preloader.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private preload: PreloaderService,
    private orderService: OrderService,
    private notify: NotificationsService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
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
      (response: Response) => { this.notify.success(response.json().message); },
      (error) => { this.notify.success(error.json().message); }
    );
  }
}
