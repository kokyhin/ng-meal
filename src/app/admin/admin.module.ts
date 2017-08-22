import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyDatePickerModule } from 'mydatepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMealComponent } from './custom-meal/custom-meal.component';

@NgModule({
  declarations: [
    AdminComponent,
    CustomMealComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MyDatePickerModule,
  ]
})
export class AdminModule {}
