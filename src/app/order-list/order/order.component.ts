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
        'value': new FormControl(this.order.order.first.value, [Validators.required, this.checkPositiveNumber]),
        'option': new FormControl(this.order.order.first.option),
      }),
      'second': new FormGroup({
        'value': new FormControl(this.order.order.second.value, [Validators.required, this.checkPositiveNumber]),
        'option': new FormControl(this.order.order.second.option),
      }),
    });
  }

  checkPositiveNumber(control: FormControl) {
    return control.value < 0 ? {'invalidNumber': true} : null;
  }

  onSubmit(order) {
    if (!this.orderForm.valid) { return; };
    const formValue = this.orderForm.value;
    if (formValue.first.value === 0) { formValue.first.option = ''; }
    if (formValue.second.value === 0) { formValue.second.option = ''; }
    const computedOrder = order;
    computedOrder.order = formValue;
    this.orderService.save(computedOrder).subscribe(
      (response: Response) => {
        this.order._id = response.json()._id;
        this.order.order.total = response.json().total;
        this.notify.success('Success');
      },
      (error) => { this.notify.error(error.json().message); }
    );
  }

}
