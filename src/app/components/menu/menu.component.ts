import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items : any[] = [
    {
      url:'home',      
      text:"Home",
      icon:'bi-house-door'
    },
    {
      url:'about',
      text:"About",
      icon:'bi-umbrella'
    },
    {
      url:'contact',
      text:"Contact",
      icon:'bi-telephone'
    },
    {
      url:'mantenedor-pokemon/new',      
      text:"Mantenedor de Pokemon",
      icon:'bi-tools'      
    }
  ];

  isAuthenticated:boolean=false;

  constructor(public userService:UserService) { }

  ngOnInit(): void {
    
  }




}
