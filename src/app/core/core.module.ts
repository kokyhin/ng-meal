import { AuthGuard } from './../auth/auth-guard.service';
import { AuthService } from './../auth/auth.service';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    AppRoutingModule,
  ],
  declarations: [FooterComponent, HeaderComponent],
  exports: [
    AppRoutingModule,
    FooterComponent,
    HeaderComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class CoreModule { }
