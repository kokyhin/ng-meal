import { PreloaderService } from './../../core/preloader/preloader.service';
import { Response } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from './../auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-passwod',
  templateUrl: './reset-passwod.component.html',
  styleUrls: ['./reset-passwod.component.scss']
})
export class ResetPasswodComponent implements OnInit {
  resetPassForm: FormGroup;
  token: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notify: NotificationsService,
    private preload: PreloaderService
  ) { }

  ngOnInit() {
    this.resetPassForm = new FormGroup({
      'password': new FormControl(null, [Validators.required]),
      'passwordCheck': new FormControl(null, [Validators.required, this.checkPassword.bind(this)], )
    });

    this.route.queryParams.subscribe(
      (params: Params) => {
        this.token = params['reset'];
      }
    );
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

  onSubmit() {
    const obj = {
      password: this.resetPassForm.get('password').value,
      token: this.token,
    };
    this.preload.state.next(true);
    this.authService.passwordUpdate(obj).subscribe(
      (response: Response) => {
        this.notify.success(response.json().message);
        this.router.navigate(['/signin']);
        this.preload.state.next(false);
      },
      (err) => {
        this.notify.error(err.json().message);
        this.preload.state.next(false);
      }
    );
  }

}
