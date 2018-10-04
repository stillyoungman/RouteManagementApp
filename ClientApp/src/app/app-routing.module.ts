import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateRouteComponent } from './pages/create-route/create-route.component';
import { TestAreaComponent } from './test-area/test-area.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'create-route', component: CreateRouteComponent },
  { path: 'create-account', component: CreateAccountComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'test', component: TestAreaComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
