import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/interfaces';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-mant-pokemon',
  templateUrl: './mant-pokemon.component.html',
  styleUrls: ['./mant-pokemon.component.css']
})
export class MantPokemonComponent implements OnInit {

  constructor(
    private service:PokemonService,
    private router:Router
    ) { }
  
  pokemons:Pokemon[] = [];  
  error:boolean = false;
  errorMsj:string = "";
  successMsj:string = "";
  success:boolean=false;
  sheets:number[]=[];
  pageActive:number = 1;
  totalPages:number=1;
  sortIcon = 'bi bi-sort-up';
  sort:string = 'asc';
  searchText:string= '';

  async ngOnInit(): Promise<void> {
    this.loadPokemon();        
    this.success = this.service.success;
    this.successMsj = this.service.successMsj;    
  }

  clickPage(page:number){
    this.pageActive = page;
    //console.log('page:', page);
    this.loadPokemon();
  }

  clickBack(){
    if(this.pageActive > 1)
    {
      this.pageActive--;
      this.loadPokemon();
    }
  }

  clickNext(){
    if(this.pageActive < this.totalPages)
    {
      this.pageActive++;
      this.loadPokemon();
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
    this.loadPokemon();
  }

  async loadPokemon(){
    
    this.service.getPokemones(this.pageActive, this.sort)
    .subscribe(resp => {
    
      this.pokemons = resp.pokemones;
      this.totalPages = resp.totalPages
      this.sheets = Array.from(Array(this.totalPages).keys());
    })
  }

  searchPokemon(){
    if (this.searchText.length>2){
      this.service.searchPokemon(this.searchText).subscribe(resp =>{
        //console.log('resp:', resp);
        this.pokemons = resp.pokemones;
      });
    }      
  }

  clearSearch(){
    this.loadPokemon();
  }

}
