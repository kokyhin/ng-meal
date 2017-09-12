import { AdminGuard } from './admin/admin-guard.service';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth-guard.service';
import { OrderListComponent } from './order-list/order-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: '404', component: ErrorPageComponent, data: {message: 'Page not Found'} },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
