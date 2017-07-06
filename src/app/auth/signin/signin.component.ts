import { NotificationsService } from 'angular2-notifications';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private authService: AuthService,
    private notify: NotificationsService
  ) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'password': new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.authService.login(this.signinForm.value).subscribe(
      (response) => {
        console.log(response);
        this.signinForm.reset();
      },
      (error) => { console.log(error); }
    );
    this.signinForm.reset();
  }
}
