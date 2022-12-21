import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantTypePokemonComponent } from './mant-type-pokemon/mant-type-pokemon.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TypePokemonRoutingModule } from './type-pokemon-routing.module';



@NgModule({
  declarations: [
    CreateComponent,
    UpdateComponent,
    DeleteComponent,
    MantTypePokemonComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TypePokemonRoutingModule
  ]
})
export class TypePokemonModule { }
