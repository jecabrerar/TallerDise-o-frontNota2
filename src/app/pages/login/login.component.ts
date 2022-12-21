import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private service:UserService,
    private router:Router
  ) { }

  usuario:User = { };
  error:boolean = false;
  errorMsj:string = ""

  loginForm:FormGroup = this.fb.group({
    "email": new FormControl(null, Validators.compose([Validators.required, Validators.email])),
    "password" :new FormControl(null, Validators.required)
  })

  ngOnInit(): void {
  }


  get email(){
    return this.loginForm.get("email");
  }

  get password(){
    return this.loginForm.get("password");
  }

  async submitForm(){    
    this.usuario.email = this.email?.value;
    this.usuario.password = this.password?.value;

    console.log(this.usuario);
    
    if(this.loginForm.valid){

      this.usuario.email = this.email?.value;
      this.usuario.password = this.password?.value;
      //console.log("llamada a serivio login usuario");
      
      const result = await this.service.login(this.usuario);

      if( result){
        console.log("Logueo OK ")
        this.error = false;
        this.errorMsj = "";
        this.router.navigate(["/home"]);
      }else
      {
        console.log("Logueo NOK ")
        this.error = true;
        this.errorMsj = "Usuario y/o contraseña invalidos.!!";
        this.router.navigate(["login"]);
      }
    }
  }

}
