import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { angularmodulemat } from './angularmodulemat';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { JwtService } from 'services/jwt.service';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from 'services/user.service';
import { AuthGuardService } from 'services/auth-guard.service';
import {httpService } from 'services/httpService';
import { HttpInterceptorService } from 'services/http-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    angularmodulemat,
    HomeModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: [],
      }
    })

  ],
  providers: [JwtService,UserService,AuthGuardService,httpService,
  { provide: HTTP_INTERCEPTORS, useClass:HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }

