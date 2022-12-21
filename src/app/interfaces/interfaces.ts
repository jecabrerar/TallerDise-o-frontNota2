

export interface User{
  email?:string,
  password?:string,
  name?:string
  roles?:string[]
}


/*export interface UserRegister{
  email?:string,
  password?:string,
  name?:string  
}*/

export interface UserToken{
  ok:boolean,
  token:string  
}
export interface ApiTypePokemon{
  ok:boolean,
  types:TypePokemon[],
  totalPages:number
}

export interface ApiTypePokemon{
  ok:boolean,
  type:TypePokemon
}
export interface TypePokemon
{
    _id?: string,
    name?: string,
    styleBackGround?:string,
    __v?:number
}

/*export interface PokemonTypes{
  _id?: number,
  pokemonId?: number,
  typePokemonId?: number,
  typePokemon?:TypePokemon
}*/

export class ApiPokemon{
  ok?:boolean;
  pokemones!: Pokemon[];
  totalPages:number=1;
}

export class Pokemon
{
  _id?: number;
  name?: string;
  poster?: string;
  //types?:roorTypePokemon[];
  typesPokemon?: TypePokemon[];
}

export interface roorTypePokemon{
  _id:string,
  typePokemonId:string
}

export interface getTypePokemonById
{
  typePokemonId:string
}

export interface Default_Id{
  _id:string
}



