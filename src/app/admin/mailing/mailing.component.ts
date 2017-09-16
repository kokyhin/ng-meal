import { AdminService } from './../admin.service';
import { NotificationsService } from 'angular2-notifications';
import { PreloaderService } from './../../core/preloader/preloader.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-mailing',
  templateUrl: './mailing.component.html',
  styleUrls: ['./mailing.component.scss']
})
export class MailingComponent implements OnInit {
  notificationForm: FormGroup;
  constructor(
    private preload: PreloaderService,
    private notify: NotificationsService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.notificationForm = new FormGroup({
      'message': new FormControl(null, [Validators.required, Validators.minLength(4)]),
    });
  }

  onSubmit() {
    this.preload.state.next(true);
    this.adminService.notifyUsers(this.notificationForm.value).subscribe(
      (response) => {
        this.preload.state.next(false);
        this.notificationForm.reset();
        this.notify.success('Notification was sent');
      },
      (err) => {
        this.preload.state.next(false);
        this.notify.error(err.json().message);
      }
    );
  }

}
