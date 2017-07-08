import { PreloaderService } from './../../core/preloader/preloader.service';
import { Response } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from './../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  resetForm: FormGroup;

  constructor(
    private authService: AuthService,
    private notify: NotificationsService,
    private preload: PreloaderService
  ) { }

  ngOnInit() {
    this.resetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email, this.checkEmail]),
    });
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
    this.authService.reset(this.resetForm.value).subscribe(
      (response: Response) => {
        this.notify.success(response.json().message);
        this.resetForm.reset();
        this.preload.state.next(false);
      },
      (error) => {
        this.notify.error(error.json().message);
        this.preload.state.next(false);
      }
    );
  }
}
