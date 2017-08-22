import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
@Component({
  selector: 'app-custom-meal',
  templateUrl: './custom-meal.component.html',
  styleUrls: ['./custom-meal.component.scss']
})
export class CustomMealComponent implements OnInit {
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    markCurrentDay: true,
    satHighlight: true,
    disableWeekends: true
  };
  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      myDate: [null, Validators.required]
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
  }

  clearDate(): void {
    this.myForm.patchValue({myDate: null});
  }
}
