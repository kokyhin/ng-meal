import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetPasswodComponent } from './reset-passwod/reset-passwod.component';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ForgotComponent,
    ResetPasswodComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {}
