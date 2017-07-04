import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  public options = {
    position: ['top', 'right'],
    timeOut: 225000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    maxStack: 8
  };
}
