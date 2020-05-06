import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { SmartReportsComponent } from './Dashboard/smart-reports/smart-reports.component';
import { LeaveManagementComponent } from './Dashboard/leave-management/leave-management.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AssociateAnalyticsComponent } from './Dashboard/associate-analytics/associate-analytics.component';
import { ComplianceMonitoringComponent } from './Dashboard/compliance-monitoring/compliance-monitoring.component';
import { AgileCampaignComponent } from './Dashboard/agile-campaign/agile-campaign.component';
import { AccessTokenReportsComponent } from './Dashboard/access-token-reports/access-token-reports.component';
import { BillingManagementComponent } from './Dashboard/billing-management/billing-management.component';
import { RevenueMonitoringComponent } from './Dashboard/revenue-monitoring/revenue-monitoring.component';
import { ForYourActionComponent } from './Dashboard/for-your-action/for-your-action.component';
import { ExecutiveDashboardComponent } from './Dashboard/executive-dashboard/executive-dashboard.component';
import { ProjectMonitoringComponent } from './Dashboard/project-monitoring/project-monitoring.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
//import { DashboardResolver } from './Dashboard/executive-dashboard/executive.dashboard.resolver';


import { Ng2SmartTableModule } from 'ngx-smart-table';
import { SearchComponent } from './Employee/Employee-head/search/search.component';
import { UploadComponent } from './Employee/employee-head/upload/upload.component';
import { DownloadComponent } from './Employee/employee-head/download/download.component';
import { HeadcountSearchComponent } from './Employee/Employee-head/headcount-search.component';
import { FileUploaderService } from './Employee/employee-head/upload/file-uploader.service';
import { UploadreportsComponent } from './Reports/uploadreports/uploadreports.component';
//import { DashboardResolver } from './Dashboard/executive-dashboard/executive.dashboard.resolver';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
    })
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    HomepageComponent,
    AssociateAnalyticsComponent,
    ComplianceMonitoringComponent,
    AgileCampaignComponent,
    AccessTokenReportsComponent,
    BillingManagementComponent,
    RevenueMonitoringComponent,
    ForYourActionComponent,
    ExecutiveDashboardComponent,
    ProjectMonitoringComponent,
    LeaveManagementComponent,
    SmartReportsComponent,
    SearchComponent,
    UploadComponent,
    DownloadComponent,
    HeadcountSearchComponent,
    UploadreportsComponent
    
  
    
  ],
  providers:[ 
    FileUploaderService
    ]
  /* DashboardResolver */
 
})
export class HomeModule { }

