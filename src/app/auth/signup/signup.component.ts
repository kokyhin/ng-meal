import { PreloaderService } from './../../core/preloader/preloader.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from './../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private notify: NotificationsService,
    private router: Router,
    private preload: PreloaderService

  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email, this.checkEmail]),
      'password': new FormControl(null, [Validators.required]),
      'passwordCheck': new FormControl(null, [Validators.required, this.checkPassword.bind(this)], )
    });
  }

  checkPassword(control: FormControl): {[s: string]: boolean} {
    if (!this.signupForm) {return; }
    const password = this.signupForm.get('password').value;
    const passCheck = control.value;
    if (password !== passCheck) {
      return {'passRepeatFail': true};
    }
    return null;
  }

  checkEmail(control: FormControl): {[s: string]: boolean} {
    if (control.value) {
      const mailDomen = control.value.split('@')[1];
      if (mailDomen !== 'fusionworks.md') {
        return {'notCorporateEmail': true};
      }
    }
    return null;
  }

  onSubmit() {
    this.preload.state.next(true);
    this.authService.register(this.signupForm.value).subscribe(
      (response: Response) => {
        this.notify.success(response.json().message);
        this.signupForm.reset();
        this.preload.state.next(false);
        this.router.navigate(['/signin']);
      },
      (error) => {
        this.notify.error(error.json().message);
        this.preload.state.next(false);
      }
    );
  }
}
