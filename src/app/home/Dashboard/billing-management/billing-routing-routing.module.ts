import { BillingManagementComponent } from './billing-Management/billing-management.component';
import { BillingManagementMainComponent } from './billing-management-main.component';

import { ClarityfileComponent } from './clarityfile/clarityfile.component';

import { AuthGuardService as AuthGuard } from " /../services/auth-guard.service";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      component: BillingManagementMainComponent,
       canActivate: [AuthGuard],
       children: [
        { path: 'billing', component: BillingManagementComponent,pathMatch: 'full' },
        { path: 'clarityfile', component: ClarityfileComponent,pathMatch: 'full' },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingRoutingModule { }
