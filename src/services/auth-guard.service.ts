import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad } from '@angular/router';
import { JwtService } from './jwt.service';
@Injectable()
export class AuthGuardService implements CanLoad, CanActivate {
  constructor(public auth: JwtService, public router: Router) {}
  canLoad(): boolean {
    if (!this.auth.loggedIn) {
      this.router.navigate(['/Login']);
      return false;
    }
    return true;
  }
  canActivate(): boolean {
    if (!this.auth.loggedIn) {
      this.router.navigate(['/Login']);
      return false;
    }
    return true;
  }
}