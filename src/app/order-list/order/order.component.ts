import { NotificationsService } from 'angular2-notifications';
import { OrderService } from './../order.service';
import { Response } from '@angular/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  @Input() order: any;
  constructor(
    private orderService: OrderService,
    private notify: NotificationsService
  ) { }

  ngOnInit() {
    this.orderForm = new FormGroup({
      'first': new FormGroup({
        'value': new FormControl(0, [Validators.required, this.checkPositiveNumber]),
        'option': new FormControl('default', [Validators.required]),
      }),
      'second': new FormGroup({
        'value': new FormControl(0, [Validators.required, this.checkPositiveNumber]),
        'option': new FormControl('default', [Validators.required]),
      }),
    });
  }

  checkPositiveNumber(control: FormControl) {
    return control.value < 0 ? {'invalidNumber': true} : null;
  }

  onSubmit(order, i) {
    if (!this.orderForm.valid) { return; };
    const computedOrder = order;
    computedOrder.order = this.orderForm.value;
    this.orderService.save(computedOrder).subscribe(
      (response: Response) => {
        this.order._id = response.json()._id;
        this.notify.success('Success');
      },
      (error) => { this.notify.error(error.json().message); }
    );
  }

}
