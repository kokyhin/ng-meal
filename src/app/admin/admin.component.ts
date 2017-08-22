import { AuthService } from './../auth/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { AdminService } from './admin.service';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private notify: NotificationsService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getWeek();
  }

  getWeek() {
    this.adminService.getOrdersWeek().subscribe(
      (response: Response) => { console.log(response.json()); },
      (error) => { this.notify.error(error.json().message); }
    );
  }

  logout() {
    this.authService.logout();
  }

}
