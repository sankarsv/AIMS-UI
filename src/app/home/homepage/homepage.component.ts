import { Component, OnInit ,ViewChild} from '@angular/core';
import {Role} from '../../Roles/roles';
import {User} from '../../Roles/user';
import { JwtService } from 'services/jwt.service';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  [x: string]: any;
  currentUser: any;
  sideNavbar:boolean=true;
  constructor(public jwtService:JwtService,public router:Router,public route: ActivatedRoute, public userService:UserService) { 
    
  }
  

  ngOnInit() {
    //login response
      this.currentUser = this.userService.getUser();
  }
//temp implementation
  logout(){
    if(this.jwtService.logout()){
      this.router.navigate(['/']);
    }
  }
  get isAdmin() {
    if(this.currentUser)
    return  this.currentUser.role === Role.Admin;

}


}

