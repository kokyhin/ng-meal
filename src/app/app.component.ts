import { AuthService } from './auth/auth.service';
import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  isAdmin = false;

  public options = {
    position: ['top', 'right'],
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    maxStack: 8
  };
  constructor( private authService: AuthService ) { }

  ngDoCheck() {
    this.isAdmin = this.authService.checkIfAdmin();
  }

  logout() {
    this.authService.setAdmin(false);
    this.authService.logout();
  }
}
