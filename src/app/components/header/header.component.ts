import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated:boolean=false;
  userName:string="";
  userId:string="";
  userRole:string="";
  userEmail:string="";

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.userService.cargarToken();
    this.isAuthenticated = this.userService.isAuthenticated;
    this.userName = this.userService.userName;
    this.userId = this.userService.userId;
    this.userRole = this.userService.userRol;
    this.userEmail = this.userService.userEmail;
    
  }

  logout(){
    this.userService.logout();
    this.router.navigate(["/login"]);
  }

}
