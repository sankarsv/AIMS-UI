import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from "@angular/forms";
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
 // @ViewChild('loginForm') loginForm: FormGroup;
  error: string;
  email: string;
  password: number;
  public user: User;
  isloading: boolean = false;
  message:any;
  constructor(public jwtService: JwtService, public router: Router, public route:ActivatedRoute,
    public userService:UserService,private formBuilder: FormBuilder) { }
  
  loginForm: FormGroup;
  submitted = false;
  loginError: string;
  loginmsg:boolean;

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      uid: ['', Validators.required],
      password: ['', Validators.required]
     
  });
    this.user = new User();
    this.user.userId = this.f.uid.value;
    this.user.password =this.f.password.value;
   }
  
   get f() { return this.loginForm.controls; }
 
 
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.user = new User();
    this.user.userId = this.f.uid.value;
    this.user.password =this.f.password.value;
    this.jwtService.login(this.user).then((data) => {
       if (!this.jwtService.invalidtoken) {
        this.router.navigate(['Dashboard/executiveDashboard']);
        this.userService.putUser(data);
        } else {
          this.loginmsg =true;
        }
      },
      error => this.error = error
    );
    }
  }
    

  
}
