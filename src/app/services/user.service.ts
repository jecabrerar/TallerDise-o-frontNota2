import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { MenuComponent } from '../components/menu/menu.component';
import { User, UserToken } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isAuthenticated:boolean=false;
  token:any=null;
  userId:string = "";
  userRol:string = "";
  userName:string="";
  userEmail:string="";

  menuItems:any=[
    {
      url:'home',     
      text:"Home",
      icon:'bi-house-door'
    }
  ];

  constructor(
    private http:HttpClient,
    private router:Router
    ) { }



  async register(usuario:User)
  {   
    return new Promise(resolve =>{
      console.log("usuario", usuario);      

      this.http.post<UserToken>(`${URL}/account/`, usuario)      
      .subscribe(resp => {
        console.log("respuesta de servicio", resp);
        console.log("resp.Status", resp.ok);
        if (resp.ok)
        {          
          this.guardarToken(resp.token);
          this.leerToken(this.token);
          this.setMenuItems();
          resolve(true);
        }else
        {
          this.removeToken();
          this.setMenuItems();
          resolve(false);
        }
      });

      return resolve;
    })      
  }

  async login(usuario:User){

    return new Promise(resolve =>{
      console.log("usuario", usuario);
      console.log("URL local service", `${URL}/account/login`);

      this.http.post<UserToken>(`${URL}/account/login`, usuario)
      .subscribe(resp => {
        console.log("respuesta de servicio", resp);
        console.log("resp.Status", resp.ok);
        if (resp.ok)
        {          
          this.guardarToken(resp.token);
          this.leerToken(this.token);
          this.setMenuItems();
          resolve(true);
        }else
        {
          this.removeToken();
          this.setMenuItems();
          resolve(false);
        }
      });

      return resolve;
    })
  }

  guardarToken(token:string)
  {
    console.log("guardando token...");
    localStorage.setItem("token", token);
    this.token = token;
    this.isAuthenticated= true;
  }

  removeToken(){
    localStorage.removeItem("token");
  }

  cargarToken(){
    var tokenString = localStorage.getItem("token")?.toString();
    this.token = tokenString;

    if (this.token){
      this.isAuthenticated= true;
      this.leerToken(tokenString);
      this.setMenuItems();
    }
  }

  leerToken(token:any){
    let jwt = token;
    let jwtData = jwt.split('.')[1];
    let decodeJSONJwtData = window.atob(jwtData);
    let decodeJwtData = JSON.parse(decodeJSONJwtData);

    this.userId = decodeJwtData.user._id;
    this.userName = decodeJwtData.user.name;
    this.userEmail = decodeJwtData.user.email;
    this.userRol = decodeJwtData.user.role;
    
    //console.log(decodeJwtData);
  }

  logout(){
    console.log("logout");
    this.removeToken();    
    this.userName="";
    this.userId="";
    this.userRol ="";
    this.isAuthenticated=false;
    this.token="";
    this.setMenuItems();
  }

  /*validateUserLogged()
  {
    if (this.isAuthenticated == false){
      this.router.navigate(["/login"]);
    }
  }*/

  async validateUser():Promise<boolean>
  {
    this.cargarToken();
    if(!this.token){
      this.router.navigate(['/login']);
      return Promise.resolve(false);
    }else{
      return Promise.resolve(true);
    }
  }

  setMenuItems(){
    if(this.isAuthenticated){
      this.menuItems = []
      
      this.menuItems.push(
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
        }
      );

      if (this.userRol=='administrador')
      {
        this.menuItems.push(
          {
            url:'mantenedor-pokemon/manage',      
            text:"Manage Pokemon",
            icon:'bi bi-emoji-dizzy'      
          },
          {
            url:'mantenedor-type-pokemon/manage',
            text:"Manage Type Pokemons",
            icon:'bi bi-gender-trans'      
          }
        ); 
      }
      //console.log("this.menuItems:", this.menuItems)
    }else{
      this.menuItems = [];
      this.menuItems.push({
        url:'home',     
        text:"Home",
        icon:'bi-house-door'
      });
    }
  }

  isAdmin(){
    return this.http.get(`${URL}/account/checkAdmin`)
  }

}
