import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterOutlet } from '@angular/router';
import { UsersComponent } from './components/users/users.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterOutlet,
    UsersComponent 
  ]
})
export class DashboardModule { }
