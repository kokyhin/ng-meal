import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderComponent } from './order-list/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    OrderListComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    AdminModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
