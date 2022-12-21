import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { MantPokemonComponent } from './mant-pokemon/mant-pokemon.component';
import { UpdateComponent } from './update/update.component';



const routes: Routes =[  
  {
    path:'manage',
    component: MantPokemonComponent 
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
export class PokemonRoutingModule { }
