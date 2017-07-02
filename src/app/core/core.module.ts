import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [],
  exports: [
    AppRoutingModule
  ]
})
export class CoreModule { }
