import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyDatePickerModule } from 'mydatepicker';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MyDatePickerModule,
  ]
})
export class AdminModule {}
