import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  orders: Object;
  orderForm: FormGroup;

  constructor(
    private authService: AuthService,
    private preload: PreloaderService,
    private orderService: OrderService,
    private notify: NotificationsService
  ) { }

  ngOnInit() {
    this.orderForm = new FormGroup({
      'first': new FormGroup({
        'value': new FormControl(0, [Validators.required]),
        'option': new FormControl('default', [Validators.required]),
      }),
      'second': new FormGroup({
        'value': new FormControl(0, [Validators.required]),
        'option': new FormControl('default', [Validators.required]),
      }),
    });
    this.getWeek();
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
      (response: Response) => {
        this.orders = response.json();
      },
      (error) => { this.notify.error(error.json().message); }
    );
  }

  getNextWeek() {
    this.orderService.getNextWeek().subscribe(
      (response: Response) => { console.log(response.json()); },
      (error) => { this.notify.error(error.json().message); }
    );
  }

  onSubmit(order) {
    const computedOrder = order;
    computedOrder.order = this.orderForm.value;
    this.orderService.save(computedOrder).subscribe(
      (response: Response) => { this.notify.success(response.json().message); },
      (error) => { this.notify.error(error.json().message); }
    );
  }
}
