import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
      private fb:FormBuilder,
      private service:UserService,
      private router:Router
    ) { }

  usuario:User = {};
  error:boolean = false;
  errorMsj:string = ""

  registerForm:FormGroup = this.fb.group({
    "email": new FormControl(null, Validators.compose([Validators.required, Validators.email])),
    "password" :new FormControl(null, [Validators.required]),
    "confirmPassword" :new FormControl(null, [Validators.required]),
    "name" :new FormControl(null, [Validators.required])    
  },{
    validator: this.MustMatch('password', 'confirmPassword')
  })

  ngOnInit(): void {
  }

  /*get f (){
    return this.registerForm.controls;
  }*/

  MustMatch(controlName: string, matchingControlName: string)
  {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  get email(){
    return this.registerForm.get("email");
  }

  get password(){
    return this.registerForm.get("password");
  }

  get confirmPassword(){
    return this.registerForm.get("confirmPassword");
  }

  get name(){
    return this.registerForm.get("name");
  }
  

  async submitForm(){
    
    this.usuario.email = this.email?.value;
    this.usuario.password = this.password?.value;

    //console.log(this.usuario);

    if(this.registerForm.valid)
    {

      this.usuario.email = this.email?.value;
      this.usuario.password = this.password?.value;      
      this.usuario.name = this.name?.value;      

      
      const result = await this.service.register(this.usuario);

      if( result){
        console.log("Registro OK ")
        this.error = false;
        this.errorMsj = "";
        this.router.navigate(["/home"]);
      }else
      {
        console.log("Registro NOK ")
        this.error = true;
        this.errorMsj = "problemas al crear el registro der usuario";
        this.router.navigate(["login"]);
      }
      /*
        this.service.register(this.usuario)
        .subscribe(resp => {
          console.log("Registro OK:", resp);
          
          this.router.navigate(["/home"]);
        },
          (err:HttpErrorResponse) =>
          {
            console.log("err:", err);
            console.log("El error:", err.message);
            if (err.error instanceof Error) {
              console.log("Client-side error");
            } else {
              console.log("Server-side error");
            }

            console.log("registro NOK ")
            this.error = true;
            this.errorMsj = err.error[0].description;
          }
        );*/

    }else{
      console.log("modelo no valido");
    }
  }
}
