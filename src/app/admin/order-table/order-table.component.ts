import { NotificationsService } from 'angular2-notifications';
import { Response } from '@angular/http';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private notify: NotificationsService,
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
}
