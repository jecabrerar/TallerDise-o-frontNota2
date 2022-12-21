import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { MantTypePokemonComponent } from './mant-type-pokemon/mant-type-pokemon.component';


const routes: Routes =[  
  {
    path:'manage',
    component: MantTypePokemonComponent 
  },
  {
    path:'new',
    component: CreateComponent 
  },
  {
    path:'update/:id',
    component:UpdateComponent 
  },
  {
    path:'delete/:id',
    component:DeleteComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class TypePokemonRoutingModule { }
