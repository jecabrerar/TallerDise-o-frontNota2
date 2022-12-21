import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TypePokemon } from 'src/app/interfaces/interfaces';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private service:PokemonService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.service.success = false;
    this.service.successMsj= "";
  }

  typePokemon:TypePokemon = {};
  error:boolean = false;
  errorMsj:string = ";"

  typePokemonForm:FormGroup = this.fb.group({
    "name": new FormControl(null, Validators.required),
    "styleBackGround" :new FormControl(null, Validators.required)    
  });


  get styleBackGround() {
    return this.typePokemonForm.get('styleBackGround');
  }

  get name(){
    return this.typePokemonForm.get("name");
  }

  async submitForm()
  {
    this.typePokemon.name = this.name?.value;
    this.typePokemon.styleBackGround = this.styleBackGround?.value;

    if(this.typePokemonForm.valid)
    {
      this.service.success = false;
        this.service.successMsj = "";

      this.typePokemon.name = this.name?.value;
      this.typePokemon.styleBackGround = this.styleBackGround?.value;

      console.log('type pokemon a crear:',this.typePokemon);

      const result = await this.service.createTypePokemon(this.typePokemon)
      .subscribe(resp => {
        console.log("Creacion de pokemon OK:", resp);        

        this.router.navigate(["/mantenedor-type-pokemon/manage"]);
      },(err:HttpErrorResponse) =>
        {
          console.log("El error:", err.message);
          if (err.error instanceof Error) {
            console.log("Client-side error");
          } else {
            console.log("Server-side error");
          }
      });

      if( result)
      {
        this.service.success = true;        
        this.service.successMsj = "Type Pokemon creado correctamente.";
        this.router.navigate(["/mantenedor-type-pokemon/manage"]);
      }else
      {
        console.log("Creacion de type pokemon no OK")
        this.error = true;
        this.errorMsj = "Problemas al crear type pokemon.";
      }
    }
  }
}
