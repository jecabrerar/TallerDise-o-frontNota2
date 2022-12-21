import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

import { RegisterComponent } from './register/register.component';
import { PokemonModule } from './mantenedor/pokemons/pokemon-module.module';
import { MantTypePokemonComponent } from './mantenedor/typesPokemon/mant-type-pokemon/mant-type-pokemon.component';
import { CreateComponent } from './mantenedor/typesPokemon/create/create.component';
import { DeleteComponent } from './mantenedor/typesPokemon/delete/delete.component';
import { UpdateComponent } from './mantenedor/typesPokemon/update/update.component';
import { TypePokemonModule } from './mantenedor/typesPokemon/type-pokemon-module.module';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,    
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    PokemonModule,
    TypePokemonModule
  ],
  exports:[    
  ]
})
export class PagesModule { }
