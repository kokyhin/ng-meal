import { MailingComponent } from './mailing/mailing.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { CustomMealComponent } from './custom-meal/custom-meal.component';
import { AdminGuard } from './admin-guard.service';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const adminRoutes: Routes = [
  {
    path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' },
      { path: 'orders', component: OrderTableComponent },
      { path: 'custom', component: CustomMealComponent },
      { path: 'mailing', component: MailingComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
