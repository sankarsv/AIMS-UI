import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { 
  AuthGuardService as AuthGuard 
} from '../services/auth-guard.service';
import { DashboardResolver } from './home/Dashboard/executive-dashboard/executive.dashboard.resolver';


// import { HomepageComponent } from './home/homepage/homepage.component';
// import { Role } from './Roles/roles';

const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent, pathMatch: 'full' },
  { path: 'Dashboard', canLoad: [AuthGuard], loadChildren: 'app/home/home.module#HomeModule'   },
  { path: '**', component: LoginComponent, pathMatch: 'full'  },
];

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

