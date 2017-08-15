import { AdminGuard } from './admin-guard.service';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const adminRoutes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
