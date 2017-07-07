import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-passwod',
  templateUrl: './reset-passwod.component.html',
  styleUrls: ['./reset-passwod.component.scss']
})
export class ResetPasswodComponent implements OnInit {
  resetPassForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.resetPassForm = new FormGroup({
      'password': new FormControl(null, [Validators.required]),
      'passwordCheck': new FormControl(null, [Validators.required, this.checkPassword.bind(this)], )
    });
  }

  checkPassword(control: FormControl): {[s: string]: boolean} {
    if (!this.resetPassForm) {return; }
    const password = this.resetPassForm.get('password').value;
    const passCheck = control.value;
    if (password !== passCheck) {
      return {'passRepeatFail': true};
    }
    return null;
  }

  onSubmit() {}

}
