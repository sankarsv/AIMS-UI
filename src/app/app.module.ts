import { BillingRoutingModule } from './home/Dashboard/billing-management/billing-routing.module';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { angularmodulemat } from "./angularmodulemat";
import { HomeModule } from "./home/home.module";
import { AppRoutingModule } from "./app-routing.module";
import { JwtService } from "services/jwt.service";
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { UserService } from "services/user.service";
import { AuthGuardService } from "services/auth-guard.service";
import { httpService } from "services/httpService";
import { HttpInterceptorService } from "services/http-interceptor.service";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner/loading-spinner.component";
import { ChartsModule } from "ng2-charts";
import { EmployeeService } from "services/employee.service";
import { NgxGaugeModule } from 'ngx-gauge';

@NgModule({
  declarations: [AppComponent, LoginComponent, LoadingSpinnerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ChartsModule,
    HttpClientModule,
    angularmodulemat,
    HomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BillingRoutingModule,
    NgxGaugeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem("access_token");
        },
        whitelistedDomains: [],
      },
    }),
  ],
  providers: [
    JwtService,
    UserService,
    AuthGuardService,
    httpService,
    EmployeeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
