import { AuthService } from './../auth/auth.service';
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
    dateFormat: 'dd.mm.yyyy',
    markCurrentDay: true,
    satHighlight: true,
    disableWeekends: true
  };

  myForm: FormGroup;
  constructor(
    private adminService: AdminService,
    private notify: NotificationsService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getWeek();
    this.myForm = this.formBuilder.group({
      myDate: [null, Validators.required]
    });
    this.setDate();
  }

  getWeek() {
    this.adminService.getOrdersWeek().subscribe(
      (response: Response) => { console.log(response.json()); },
      (error) => { this.notify.error(error.json().message); }
    );
  }

  setDate(): void {
    const date = new Date();
    this.myForm.patchValue({myDate: {
    date: {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()}
    }});
  }

  clearDate(): void {
    this.myForm.patchValue({myDate: null});
  }

  logout() {
    this.authService.logout();
  }

}
