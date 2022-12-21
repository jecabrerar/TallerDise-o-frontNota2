import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Pokemon, TypePokemon } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listPokemon:Pokemon[] = [];
  textSearch:string = "";
  nextPage:number = 12;
  loading:boolean = false;  
  userRole:string="";

  sheets:number[]=[];
  pageActive:number = 1;
  totalPages:number=1;
  sortIcon = 'bi bi-sort-up';
  sort:string = 'asc';
  searchText:string= '';


  constructor(private service:PokemonService,
    private userService:UserService,    
    private servicePokemon:PokemonService
    )  { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loadPokemons();
    }, 3600);    
    
    this.userRole = this.userService.userRol;
  }

  clickPage(page:number){
    this.pageActive = page;
    console.log('page:', page);
    this.loadPokemons();
  }

  clickBack(){
    if(this.pageActive > 1)
    {
      this.pageActive--;
      this.loadPokemons();
    }
  }

  clickNext(){
    if(this.pageActive < this.totalPages)
    {
      this.pageActive++;
      this.loadPokemons();
    }
  }

  toogleSort()
  {
    if(this.sort == 'asc'){
      this.sortIcon = 'bi bi-sort-down';
      this.sort = 'desc';      
    }else{
      this.sortIcon = 'bi bi-sort-up';
      this.sort = 'asc'
    }
    this.loadPokemons();
  }

  loadPokemons():void
  {
    this.listPokemon = [];
    this.service.getPokemones(this.pageActive, this.sort)
      .subscribe(resp=>
      {
        console.log(resp)
        if(resp)
        {
          this.listPokemon = resp.pokemones;
          this.loading = false;          
          this.totalPages = resp.totalPages
          this.sheets = Array.from(Array(this.totalPages).keys());
        }

        console.log("home salida ok");
        
      }, (err:HttpErrorResponse) =>
        {
          this.loading = false;
          console.log("El error:", err.message);
          if (err.error instanceof Error) {
            console.log("Client-side error");
          } else {
            console.log("Server-side error");
          }
      });
  }

  searchPokemon(){
    if (this.searchText.length>2)
    {
      this.service.searchPokemon(this.searchText).subscribe(resp =>{
        console.log('searchPokemon resp:', resp);
        this.listPokemon = resp.pokemones;
      });
    }      
  }

  clearSearch(){
    this.loadPokemons();
  }

}
