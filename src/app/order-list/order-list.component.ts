import { PreloaderService } from './../core/preloader/preloader.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private preload: PreloaderService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  preloadClick() {
    this.preload.state.next(true);
    const that = this;
    setTimeout(function() {
      that.preload.state.next(false);
    }, 1000);
  }

}
