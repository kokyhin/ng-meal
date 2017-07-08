import { PreloaderService } from './preloader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {

  constructor(
    private preload: PreloaderService
  ) { }

  ngOnInit() {
    this.preload.checkState().subscribe(
      (state) => {
        if (state) {
          this.preloaderShow();
        } else {
          this.preloaderHide();
        }
      }
    );
  }

  preloaderShow() {
    console.log('preloader showing');
  }

  preloaderHide() {
    console.log('Preloader hide');
  }

}
