import { AuthService } from './../../auth/auth.service';
import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss']
})
export class FabButtonComponent {
  @ViewChild('menuBtn') menu: ElementRef;
  @Output() nextWeek = new EventEmitter();
  @Output() currWeek = new EventEmitter();

  constructor(
    private authService: AuthService,
  ) { }

  toggleMenu() {
    this.menu.nativeElement.classList.toggle('expanded');
  }

  logout() {
    this.authService.logout();
  }

  getNextWeek() {
    this.nextWeek.emit();
  }

  getCurrWeek() {
    this.currWeek.emit();
  }

}
