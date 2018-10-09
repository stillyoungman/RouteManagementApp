import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CreateRouteComponent } from './pages/create-route/create-route.component';
import { TestAreaComponent } from './test-area/test-area.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { MyRoutesComponent } from './pages/my-routes/my-routes.component';
import { RouteComponent } from './pages/route/route.component';

import { LoggedInGuard } from './core/helpers/loggedInGuard';
import { ToIndex } from './core/helpers/toIndex';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'create-route', component: CreateRouteComponent },
  { path: 'create-account', component: CreateAccountComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'my-routes', component: MyRoutesComponent, canActivate: [LoggedInGuard] }, 
  { path: 'route/:id', component: RouteComponent },
  { path: 'test', component: TestAreaComponent },
  { path: '**', component: IndexComponent, canActivate: [ToIndex] }//*
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
