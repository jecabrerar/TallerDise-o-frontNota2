import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypePokemon } from 'src/app/interfaces/interfaces';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-mant-type-pokemon',
  templateUrl: './mant-type-pokemon.component.html',
  styleUrls: ['./mant-type-pokemon.component.css']
})
export class MantTypePokemonComponent implements OnInit {

  constructor(
    private service:PokemonService,
    private router:Router
    ) { }
  
  typesPokemon:TypePokemon[] = [];
  //types:TypePokemon[] = [];
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
    this.loadTypesPokemon();        
    this.success = this.service.success;
    this.successMsj = this.service.successMsj;    
  }

  clickPage(page:number){
    this.pageActive = page;
    console.log('page:', page);
    this.loadTypesPokemon();
  }

  clickBack(){
    if(this.pageActive > 1)
    {
      this.pageActive--;
      this.loadTypesPokemon();
    }
  }

  clickNext(){
    if(this.pageActive < this.totalPages)
    {
      this.pageActive++;
      this.loadTypesPokemon();
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
    this.loadTypesPokemon();
  }

  async loadTypesPokemon(){
    console.log('pageActive:', this.pageActive);
    this.service.getTypePokemonsPagination(this.pageActive, this.sort)
    .subscribe(resp => {
      console.log('resp:', resp);
      this.typesPokemon = resp.types;
      this.totalPages = resp.totalPages
      this.sheets = Array.from(Array(this.totalPages).keys());
    })
  }

  searchTypePokemon(){

    if (this.searchText.length>2){
      this.service.searchText(this.searchText).subscribe(resp =>{
        //console.log('resp:', resp);
        this.typesPokemon = resp.types;
      });
    }else{
      this.loadTypesPokemon();
    }      
  }

  clearSearch(){
    this.loadTypesPokemon();
  }
  
}
