import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypePokemon } from 'src/app/interfaces/interfaces';
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
      this.service.getTypePokemonById(this._id).subscribe(resp =>{
        console.log('resp:',resp);
        this.typePokemon = resp.type;
      });
      
    }
  }

  typePokemon:TypePokemon = {};
  error:boolean = false;
  errorMsj:string = ";"

  typePokemonForm:FormGroup = this.fb.group({
    "id": new FormControl(null),
    "name": new FormControl(null, Validators.required),
    "styleBackGround" :new FormControl(null, Validators.required)    
  });

  get styleBackGround() {
    return this.typePokemonForm.get('styleBackGround');
  }

  get name(){
    return this.typePokemonForm.get("name");
  }

  get id()
  {
    return this.typePokemonForm.get("id")
  }

  async submitForm() {
    Swal.fire({
      title: '¿Esta seguro de eliminar el type pokemon?',
      showCancelButton: true,
      confirmButtonColor: '#c40e0e',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result => {

      if (result.isConfirmed) {
        this.typePokemon.name = this.name?.value;
        this.typePokemon.styleBackGround = this.styleBackGround?.value;

        if (this.typePokemonForm.valid) {
          this.service.success = false;
          this.service.successMsj = "";

          this.typePokemon.name = this.name?.value;
          this.typePokemon.styleBackGround = this.styleBackGround?.value;

          console.log('type pokemon a crear:', this.typePokemon);

          const result = this.service.deleteTypePokemon(this._id)
            .subscribe(resp => {
              console.log("Creacion de pokemon OK:", resp);

              this.router.navigate(["/mantenedor-type-pokemon/manage"]);
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
            this.service.successMsj = "Type Pokemon creado correctamente.";
            this.router.navigate(["/mantenedor-type-pokemon/manage"]);
          } else {
            console.log("Creacion de type pokemon no OK")
            this.error = true;
            this.errorMsj = "Problemas al crear type pokemon.";
          }
        }
      }
    }))
  }

}
