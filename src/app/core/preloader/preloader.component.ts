import { PreloaderService } from './preloader.service';
import { Component, OnInit, ChangeDetectorRef, HostBinding } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {
  @HostBinding('class.active') someField: Boolean = false;

  constructor(
    private preload: PreloaderService,
    private cdRef: ChangeDetectorRef
  ) { }


  ngOnInit() {
    this.preload.checkState().subscribe(
      (state) => {
        if (state) {
          this.someField = true;
        } else {
          this.someField = false;
        }
      }
    );
  }
}
