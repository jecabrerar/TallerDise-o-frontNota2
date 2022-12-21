import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/interfaces';
import { PokemonService } from 'src/app/services/pokemon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private service:PokemonService,
    private router:Router,
    private _Activatedroute:ActivatedRoute
    ) { }

    _id:string | null = "";

  ngOnInit(): void {
    this.service.success = false;
    this.service.successMsj= "";
    this._id = this._Activatedroute.snapshot.paramMap.get("id");
    console.log('id param:', this._id);
    if (this._id)
    {
      this.service.getPokemonById(this._id).subscribe((resp:any) =>{
        console.log('resp:',resp);
        this.pokemon = resp.pokemon;
      });
      
    }
  }

  pokemon:Pokemon = {};
  error:boolean = false;
  errorMsj:string = ";"

  pokemonForm:FormGroup = this.fb.group({
    "id": new FormControl(null),
    "name": new FormControl(null, Validators.required),
    "poster" :new FormControl(null, Validators.required)    
  });

  get poster() {
    return this.pokemonForm.get('poster');
  }

  get name(){
    return this.pokemonForm.get("name");
  }

  get id()
  {
    return this.pokemonForm.get("id")
  }

  async submitForm() {
    Swal.fire({
      title: '¿Esta seguro de eliminar el pokemon?',
      showCancelButton: true,
      confirmButtonColor: '#c40e0e',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result => {

      if (result.isConfirmed) {
        this.pokemon.name = this.name?.value;
        this.pokemon.poster = this.poster?.value;

        if (this.pokemonForm.valid) {
          this.service.success = false;
          this.service.successMsj = "";

          this.pokemon.name = this.name?.value;
          this.pokemon.poster = this.poster?.value;

          const result = this.service.deletePokemon(this._id)
            .subscribe(resp => {
              console.log("Creacion de pokemon OK:", resp);

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
            this.router.navigate(["/mantenedor-pokemon/manage"]);
          } else {
            console.log("Creacion de pokemon no OK")
            this.error = true;
            this.errorMsj = "Problemas al crear pokemon.";
          }
        }
      }
    }))
  }


  /*async deletePokemon(){
    if (confirm('¿Esta seguro se querer eliminar el pokemon?')){

      this.service.success = false;
      this.service.successMsj = "";

      const result = await this.service.deletePokemon(this.selectedPokemon._id)
      .subscribe(resp => {
        console.log("respuesta de servicio", resp);
        //this.router.navigate(["/home"]);
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
        console.log("eliminacion de pokemon OK")
        this.service.success = true;
        this.service.successMsj = "Pokemon eliminado correctamente.";
        this.router.navigate(["/home"]);
      }else
      {
        console.log("Eliminacion de pokemon NO OK")
        this.error = true;
        this.errorMsj = "Problemas al crear o actulizar pokemon.";
      }
    }
  }
  */

}
