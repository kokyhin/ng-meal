import { AuthService } from './../../auth/auth.service';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss']
})
export class FabButtonComponent {
  @ViewChild('menuBtn') menu: ElementRef;

  constructor(
    private authService: AuthService,
  ) { }

  toggleMenu() {
    this.menu.nativeElement.classList.toggle('expanded');
  }

  logout() {
    this.authService.logout();
  }

}
