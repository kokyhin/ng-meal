import { PreloaderService } from './../../core/preloader/preloader.service';
import { Response } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  token: string;
  constructor(
    private preload: PreloaderService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notify: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.token = params['activation'];
      }
    );
    this.signinForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'password': new FormControl(null, [Validators.required]),
      'token': new FormControl(this.token),
    });
  }

  onSubmit() {
    this.preload.state.next(true);
    this.authService.login(this.signinForm.value).subscribe(
      (response: Response) => {
        this.signinForm.reset();
        this.router.navigate(['/']);
        this.preload.state.next(false);
      },
      (error) => {
        const message = error._body;
        this.preload.state.next(false);
        if (message === 'Unauthorized') {
          this.notify.error('Wrong combination of username and password');
        } else {
          this.notify.error(error.json().message);
        }
      }
    );
  }
}
