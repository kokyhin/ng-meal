import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  declarations: [],
  exports: [
    AppRoutingModule
  ]
})
export class CoreModule { }
