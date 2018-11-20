import { ResetPasswodComponent } from './reset-passwod/reset-passwod.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const authRoutes: Routes = [
  { path: '**', redirectTo: '/404' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'reset-password', component: ResetPasswodComponent },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
