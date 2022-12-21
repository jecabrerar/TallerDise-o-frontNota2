import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Default_Id, Pokemon, TypePokemon } from 'src/app/interfaces/interfaces';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-pokemon',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private service:PokemonService,
    private router:Router,
    private userService:UserService
    )
    {
    }

  ngOnInit(): void
  {

    //this.selectedPokemon =  this.service.selectedPokemon;
    this.service.success = false;
    this.service.successMsj= "";

    this.service.getTypePokemons()
      .subscribe(resp =>{
        console.log("buscando tipo de pokemones...");
        console.log(resp);
        this.listTypePokemon = resp.types;
        this.addCheckboxesToForm();
    });
  }

  listTypePokemon:TypePokemon[]=[];
  pokemon:Pokemon = {};
  error:boolean = false;
  errorMsj:string = "";
  urlImg:string = "";
  
  //selectedPokemon:Pokemon = {};

  pokemonForm:FormGroup = this.fb.group({
    "name": new FormControl(null, Validators.required),
    "poster" :new FormControl(null, Validators.required),
    "typesPokemon": new FormArray([])
  })

  private addCheckboxesToForm()
  {
   //console.log("add chk");
    console.log(this.listTypePokemon);

    this.listTypePokemon.forEach( element =>{
       console.log(element.name);
       var checked = this.findSelectedType(element);
       console.log("element.name",element.name + " = " + checked);
        this.typesPokemonFormArray.push(new FormControl(checked));
      }
    );
  }

  findSelectedType(tp:TypePokemon)
  {
      let ret:boolean = false;

      
      //this.selectedPokemon.typesPokemon?.forEach( element =>
      this.pokemon.typesPokemon?.forEach( element =>
      {
        if ( tp._id == element._id)
        {
          //console.log("match OK elemt:", element);
          ret = true;
          return;

        }
      });

      //console.log("no sali");
      return ret;
  }

  get typesPokemonFormArray() {
    return this.pokemonForm.get('typesPokemon') as FormArray;
  }

  get name(){
    return this.pokemonForm.get("name");
  }

  get poster(){
    return this.pokemonForm.get("poster");
  }


  async submitForm() {
    Swal.fire({
      title: '¿Esta seguro de crear nuevo pokemon?',
      showCancelButton: true,
      confirmButtonColor: '#0f58f7',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((async result => {

      if (result.isConfirmed) {
        var selectedTypesPokemonIds = this.pokemonForm.value.typesPokemon
          .map((checked: boolean, i: number) => checked ? this.listTypePokemon[i]._id : null)
          .filter((v: null) => v !== null);

        console.log("selectedTypesPokemonIds:", selectedTypesPokemonIds);

        this.pokemon.name = this.name?.value;
        this.pokemon.poster = this.poster?.value;
        this.pokemon._id = this.pokemon._id;

        let pokemonTypesSelected: TypePokemon[] = [];

        selectedTypesPokemonIds.forEach((element: string) => {
          let pokemonType: TypePokemon = {
            _id: element
          };

          pokemonTypesSelected.push(pokemonType);
        });

        this.pokemon.typesPokemon = pokemonTypesSelected;

        if (this.pokemonForm.valid) {
          this.service.success = false;
          this.service.successMsj = "";

          this.pokemon.name = this.name?.value;
          this.pokemon.poster = this.poster?.value;

          const result = await this.service.createPokemon(this.pokemon)
            .subscribe(resp => {
              console.log("respuesta de servicio OK:", resp);

              this.router.navigate(["/mantenedor-pokemon/manage"]);
            }, (err: HttpErrorResponse) => {
              console.log("El error:", err.message);
              if (err.error instanceof Error) {
                console.log("Client-side error");
              } else {
                console.log("Server-side error");
              }
            });
          if (result) {
            this.service.success = true;
            this.service.successMsj = "Pokemon creado correctamente.";
            this.router.navigate(["/home"]);
          } else {
            console.log("Creacion de pokemon no OK")
            this.error = true;
            this.errorMsj = "Problemas al crear pokemon.";
          }
        }
      }

    }));
  }
}
