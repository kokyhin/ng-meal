import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'password': new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.signinForm.value);
    this.signinForm.reset();
  }
}
