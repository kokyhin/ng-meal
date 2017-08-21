import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { AdminService } from './admin.service';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };

  myForm: FormGroup;
  constructor(
    private adminService: AdminService,
    private notify: NotificationsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getWeek();
    this.myForm = this.formBuilder.group({
      // Empty string or null means no initial value. Can be also specific date for
      // example: {date: {year: 2018, month: 10, day: 9}} which sets this date to initial
      // value.

      myDate: [null, Validators.required]
      // other controls are here...
    });
  }

  getWeek() {
    this.adminService.getOrdersWeek().subscribe(
      (response: Response) => { console.log(response.json()); },
      (error) => { this.notify.error(error.json().message); }
    );
  }

  setDate(): void {
    // Set today date using the patchValue function
    let date = new Date();
    this.myForm.patchValue({myDate: {
    date: {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()}
    }});
  }

  clearDate(): void {
    // Clear the date using the patchValue function
    this.myForm.patchValue({myDate: null});
  }

}
