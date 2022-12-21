import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import {Pokemon, ApiPokemon, TypePokemon, ApiTypePokemon} from '../interfaces/interfaces';
import { UserService } from './user.service';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http:HttpClient, private userService:UserService) {
    this.successMsj = "";
    this.success = false;
   }

  successMsj:string = "";
  success:boolean = false;

  searchPokemon(text:string):Observable<any>
  {    
    return this.http.get(`${URL}/pokemons/search?searchText=${text}`);
  }

  getPokemones(page:number, sort:string)
  { 
    return this.http.get<ApiPokemon>(`${URL}/pokemons?page=${page}&sort=${sort}`);
  }

  getPokemonById(pokemonId:string)
  {
    return this.http.get(`${URL}/pokemons/findById/${pokemonId}`);
  }

  getTypePokemons()
  {
    return this.http.get<ApiTypePokemon>(`${URL}/typePokemon`);
  }

  getTypePokemonsPagination(page:number, sort:string)
  {
    console.log('in service page:', page);
    return this.http.get<ApiTypePokemon>(`${URL}/typePokemon/pagination?page=${page}&sort=${sort}`);
  }

  getTypePokemonById(typeId:string)
  {
    return this.http.get<ApiTypePokemon>(`${URL}/typePokemon/findById/${typeId}`);
  }

  createPokemon(pokemon:Pokemon):Observable<any>
  {   
    return this.http.post(`${URL}/pokemons/`, pokemon);    
  }

  createTypePokemon(typePokemon:TypePokemon):Observable<any>
  {   
    return this.http.post(`${URL}/typePokemon/`, typePokemon);    
  }

  updateTypePokemon(typePokemon:TypePokemon):Observable<any>
  {   
    return this.http.put(`${URL}/typePokemon/`, typePokemon);
  }

  deleteTypePokemon(typePokemonId:string|null):Observable<any>
  { 
    return this.http.delete(`${URL}/typePokemon/deleteById/${typePokemonId}`);
  }

  updatePokemon(pokemon:Pokemon):Observable<any>
  {   
    return this.http.put(`${URL}/pokemons/`, pokemon);    
  }

  deletePokemon(idPokemon?:any):Observable<any>
  {
    return this.http.delete(`${URL}/pokemons/${idPokemon}`);
  }


  searchText(text:string):Observable<any>
  {    
    return this.http.get(`${URL}/typePokemon/search?searchText=${text}`);
  }
}
