import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PreloaderService {
  state = new Subject<Boolean>();
  constructor() { }
  checkState(): Observable<Boolean> {
    return this.state;
  }
}
