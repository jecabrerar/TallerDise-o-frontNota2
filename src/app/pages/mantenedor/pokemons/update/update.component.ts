import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon, TypePokemon } from 'src/app/interfaces/interfaces';
import { PokemonService } from 'src/app/services/pokemon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit, AfterViewInit  {

  constructor(private fb:FormBuilder,
    private service:PokemonService,
    private router:Router,    
    private _Activatedroute: ActivatedRoute,
    private cd:ChangeDetectorRef
    )
    {
    } 
  ngAfterViewInit(){
    if (this._id) {        
      this.service.getPokemonById(this._id).subscribe((resp: any) => {

        console.log('pokemon encontrado:', resp);      
        this.pokemon = resp.pokemon;
        this.cd.detectChanges();

        this.service.getTypePokemons()
          .subscribe(resp => {
            this.listTypePokemon = resp.types;
            this.addCheckboxesToForm();
          });
      }, (err: HttpErrorResponse) => {
        console.log("El error:", err.message);
    
        if (err.error instanceof Error) {
          console.log("Client-side error");
        } else {
          console.log("Server-side error");
        }
      })
    }    
    
  }
  
  _id:any = '';

  ngOnInit() {
    this.service.success = false;
    this.service.successMsj = "";
    this._id = this._Activatedroute.snapshot.paramMap.get("id");
    console.log('id pokem a editar:', this._id);    
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
    "id" :new FormControl(null),
    "typesPokemon": new FormArray([])
  })

  private addCheckboxesToForm()
  {
    //console.log("add chk");
    console.log(this.listTypePokemon);

    this.listTypePokemon.forEach( element =>{
       //console.log(element.name);
       var checked = this.findSelectedType(element);
       //console.log("element.name",element.name + " = " + checked);
       this.typesPokemonFormArray.push(new FormControl(checked));
      }
    );
  }

  findSelectedType(tp:TypePokemon)
  {
      let ret:boolean = false;      
      this.pokemon.typesPokemon?.forEach( element =>
      {        
        if ( tp._id == element._id)
        {
          ret = true;
          return;
        }
      });

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
  
  get id(){
    return this.pokemonForm.get("id");
  }


  async submitForm() {
    Swal.fire({
      title: '¿Esta seguro de actualizar el pokemon?',
      showCancelButton: true,
      confirmButtonColor: '#f5bf42',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((async result => {

      if (result.isConfirmed) {
        
        var selectedTypesPokemonIds = this.pokemonForm.value.typesPokemon
          .map((checked: boolean, i: number) => checked ? this.listTypePokemon[i]._id : null)
          .filter((v: null) => v !== null);

        this.pokemon._id = this.id?.value;
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

          const result = await this.service.updatePokemon(this.pokemon)
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
