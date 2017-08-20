import { AdminGuard } from './../admin/admin-guard.service';
import { AdminService } from './../admin/admin.service';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderService } from './../order-list/order.service';
import { PreloaderService } from './preloader/preloader.service';
import { PreloaderComponent } from './preloader/preloader.component';
import { AuthGuard } from './../auth/auth-guard.service';
import { AuthService } from './../auth/auth.service';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { FabButtonComponent } from './fab-button/fab-button.component';

@NgModule({
  imports: [
    AppRoutingModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [FooterComponent, HeaderComponent, PreloaderComponent, FabButtonComponent],
  exports: [
    AppRoutingModule,
    FooterComponent,
    HeaderComponent,
    SimpleNotificationsModule,
    PreloaderComponent,
    FabButtonComponent,
    ReactiveFormsModule
  ],
  providers: [
    AdminService,
    AuthService,
    AuthGuard,
    AdminGuard,
    PreloaderService,
    OrderService,
    ReactiveFormsModule
  ]
})
export class CoreModule { }
