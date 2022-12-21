import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { MantPokemonComponent } from './mant-pokemon/mant-pokemon.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';


@NgModule({
  declarations: [    
    MantPokemonComponent,
    CreateComponent,
    UpdateComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    PokemonRoutingModule
  ],
  exports:[
    
  ]
})
export class PokemonModule { }
