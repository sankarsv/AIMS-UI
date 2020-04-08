import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociateAnalyticsComponent } from './Dashboard/associate-analytics/associate-analytics.component';
import { ComplianceMonitoringComponent } from './Dashboard/compliance-monitoring/compliance-monitoring.component';
import { AgileCampaignComponent } from './Dashboard/agile-campaign/agile-campaign.component';
import { AccessTokenReportsComponent } from './Dashboard/access-token-reports/access-token-reports.component';
import { BillingManagementComponent } from './Dashboard/billing-management/billing-management.component';
import { RevenueMonitoringComponent } from './Dashboard/revenue-monitoring/revenue-monitoring.component';
import { ForYourActionComponent } from './Dashboard/for-your-action/for-your-action.component';
import { ExecutiveDashboardComponent } from './Dashboard/executive-dashboard/executive-dashboard.component';
import { ProjectMonitoringComponent } from './Dashboard/project-monitoring/project-monitoring.component';
import { LeaveManagementComponent } from './Dashboard/leave-management/leave-management.component';
import { SmartReportsComponent } from './Dashboard/smart-reports/smart-reports.component';
import { HomepageComponent } from './homepage/homepage.component';
import {
  AuthGuardService as AuthGuard
} from '../../services/auth-guard.service';
import { DashboardResolver } from './Dashboard/executive-dashboard/executive.dashboard.resolver';
import { SearchComponent } from './Employee/Employee-head/search/search.component';
import { HeadcountSearchComponent } from './Employee/Employee-head/headcount-search.component';





const routes: Routes = [
  {
    path: 'Dashboard',
    component: HomepageComponent,
    canActivate: [AuthGuard],
    children: [



      { path: 'associateAnalytics', component: AssociateAnalyticsComponent, pathMatch: 'full' },

      { path: 'complianceMonitoring', component: ComplianceMonitoringComponent, pathMatch: 'full' },

      { path: 'agileCampaign', component: AgileCampaignComponent, pathMatch: 'full' },

      { path: 'accessTokenReports', component: AccessTokenReportsComponent, pathMatch: 'full' },

      { path: 'billingManagement', component: BillingManagementComponent, pathMatch: 'full' },

      { path: 'revenueMonitoring', component: RevenueMonitoringComponent, pathMatch: 'full' },

      { path: 'forYourAction', component: ForYourActionComponent, pathMatch: 'full' },

      { path: 'executiveDashboard', resolve: { chartData: DashboardResolver }, component: ExecutiveDashboardComponent, pathMatch: 'full' },

      { path: 'projectMonitoring', component: ProjectMonitoringComponent, pathMatch: 'full' },

      { path: 'leaveManagement', component: LeaveManagementComponent, pathMatch: 'full' },

      { path: 'smartReports', component: SmartReportsComponent, pathMatch: 'full' }
    ]
  },
   {
     path: 'employee',
     component: HomepageComponent,
      canActivate: [AuthGuard],
      children: [
       { path: 'homesearch', component: HeadcountSearchComponent, pathMatch: 'full' },
      //  { path: 'upload', component: UploadComponent, pathMatch: 'full' },
      //  { path: 'download', component: DownloadComponent, pathMatch: 'full' },
     ]
 },
 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
