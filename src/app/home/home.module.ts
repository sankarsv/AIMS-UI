import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeRoutingModule } from "./home-routing.module";
import { SmartReportsComponent } from "./Dashboard/smart-reports/smart-reports.component";
import { LeaveManagementComponent } from "./Dashboard/leave-management/leave-management.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { AssociateAnalyticsComponent } from "./Dashboard/associate-analytics/associate-analytics.component";
import { ComplianceMonitoringComponent } from "./Dashboard/compliance-monitoring/compliance-monitoring.component";
import { AgileCampaignComponent } from "./Dashboard/agile-campaign/agile-campaign.component";
import { AccessTokenReportsComponent } from "./Dashboard/access-token-reports/access-token-reports.component";
import { BillingManagementComponent } from "./Dashboard/billing-management/billing-management.component";
import { RevenueMonitoringComponent } from "./Dashboard/revenue-monitoring/revenue-monitoring.component";
import { ForYourActionComponent } from "./Dashboard/for-your-action/for-your-action.component";
import { ExecutiveDashboardComponent } from "./Dashboard/executive-dashboard/executive-dashboard.component";
import { ProjectMonitoringComponent } from "./Dashboard/project-monitoring/project-monitoring.component";
import { NgCircleProgressModule } from "ng-circle-progress";
//import { DashboardResolver } from './Dashboard/executive-dashboard/executive.dashboard.resolver';

import { Ng2SmartTableModule } from "ngx-smart-table";
import { SearchComponent } from "./Employee/Employee-head/search/search.component";
import { UploadComponent } from "./Employee/employee-head/upload/upload.component";
import { DownloadComponent } from "./Employee/employee-head/download/download.component";
import { HeadcountSearchComponent } from "./Employee/Employee-head/headcount-search.component";
import { FileUploaderService } from "./Employee/employee-head/upload/file-uploader.service";
import { DashboardResolver } from "./Dashboard/executive-dashboard/executive.dashboard.resolver";
import { BrmBarchartComponent } from "./Dashboard/executive-dashboard/charts-dashboard/brm-barchart/brm-barchart.component";
import { ChartsModule } from "ng2-charts";
import { BillablePiechartComponent } from './Dashboard/executive-dashboard/charts-dashboard/billable-piechart/billable-piechart.component';
import { ExpDoughnutchartComponent } from './Dashboard/executive-dashboard/charts-dashboard/exp-doughnutchart/exp-doughnutchart.component';
import { TraineeBarchartComponent } from './Dashboard/executive-dashboard/charts-dashboard/trainee-barchart/trainee-barchart.component';
import { BaHorizontalbarchartComponent } from './Dashboard/executive-dashboard/charts-dashboard/ba-horizontalbarchart/ba-horizontalbarchart.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    ChartsModule,
    NgCircleProgressModule.forRoot({}),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    BrmBarchartComponent,
    BillablePiechartComponent,
    ExpDoughnutchartComponent,
    TraineeBarchartComponent,
    BaHorizontalbarchartComponent,
  ],
  providers: [FileUploaderService, DashboardResolver],
  /* DashboardResolver */
})
export class HomeModule {}
