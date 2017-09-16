import { PreloaderService } from './../../core/preloader/preloader.service';
import { AdminService } from './../admin.service';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
@Component({
  selector: 'app-custom-meal',
  templateUrl: './custom-meal.component.html',
  styleUrls: ['./custom-meal.component.scss']
})
export class CustomMealComponent implements OnInit {
  first: any;
  second: any;
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    markCurrentDay: true,
    satHighlight: true,
    disableWeekends: true
  };
  myForm: FormGroup;
  firstForm: FormGroup;
  secondForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private notify: NotificationsService,
    private adminService: AdminService,
    private preload: PreloaderService
  ) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      myDate: [null, Validators.required]
    });
    this.firstForm = new FormGroup({
      'first': new FormControl(null, [Validators.required]),
    });
    this.secondForm = new FormGroup({
      'second': new FormControl(null, [Validators.required]),
    });
    this.setDate();
  }

  setDate(): void {
    const date = new Date();
    this.myForm.patchValue({myDate: {
    date: {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()}
    }});
    this.getOptions(this.myForm.getRawValue().myDate.date);
  }

  clearDate(): void {
    this.myForm.patchValue({myDate: null});
  }

  onAddFirstOption() {
    if (!this.firstForm.valid) { return; };
    this.first.push(this.firstForm.get('first').value);
    this.firstForm.reset();
  }

  onAddSecondOption() {
    if (!this.secondForm.valid) { return; };
    this.second.push(this.secondForm.get('second').value);
    this.secondForm.reset();
  }

  saveOptions() {
    const date = this.myForm.getRawValue().myDate.date;
    const options = {
      day: `${date.month}/${date.day}/${date.year}`,
      first: this.first,
      second: this.second
    };
    this.preload.state.next(true);
    this.adminService.createOptions(options).subscribe(
      (response: Response) => {
        this.preload.state.next(false);
        this.notify.success(response.json().message);
      },
      (error) => {
        this.preload.state.next(false);
        this.notify.error(error.json().message);
      }
    );
  }

  removeFirstOption(i) {
    this.first.splice(i, 1);
  }

  removeSecondOption(i) {
    this.second.splice(i, 1);
  }

  getOptions(date) {
    const day = `${date.month}/${date.day}/${date.year}`;
    this.adminService.getOptions(day).subscribe(
      (response: Response) => {
        this.first = response.json().first;
        this.second = response.json().second;
      },
      (error) => { this.notify.error(error.json().message); }
    );
  }

  onDateChanged(event: IMyDateModel) {
    this.getOptions(event.date);
  }
}
