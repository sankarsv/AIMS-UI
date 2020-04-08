import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from '../Roles/user'
import { JwtService } from 'services/jwt.service';
import { first } from 'rxjs/operators';
import { UserService } from 'services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: FormGroup;
  error: string;
  email: string;
  password: number;
  public user: User;
  constructor(public jwtService: JwtService, public router: Router, public route:ActivatedRoute,public userService:UserService) { }

  ngOnInit() {
    this.user = new User();
    this.user.userName = 'admin';
    this.user.id=123456;
  }
  submit() {
    if (this.loginForm.valid) {
      this.jwtService.login(this.user).then(
        result => {
          if (result) {
            this.router.navigate(['Dashboard/executiveDashboard']);
            this.userService.putUser(result);
          }
        }
      );
    }

  }
}
