import { PreloaderService } from './preloader/preloader.service';
import { PreloaderComponent } from './preloader/preloader.component';
import { AuthGuard } from './../auth/auth-guard.service';
import { AuthService } from './../auth/auth.service';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [
    AppRoutingModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [FooterComponent, HeaderComponent, PreloaderComponent],
  exports: [
    AppRoutingModule,
    FooterComponent,
    HeaderComponent,
    SimpleNotificationsModule,
    PreloaderComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    PreloaderService
  ]
})
export class CoreModule { }
