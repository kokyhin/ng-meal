import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyDatePickerModule } from 'mydatepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMealComponent } from './custom-meal/custom-meal.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { MailingComponent } from './mailing/mailing.component';

@NgModule({
  declarations: [
    AdminComponent,
    CustomMealComponent,
    OrderTableComponent,
    MailingComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MyDatePickerModule,
  ]
})
export class AdminModule {}
