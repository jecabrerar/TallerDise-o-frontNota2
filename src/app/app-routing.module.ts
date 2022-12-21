import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: 'home',
    component : HomeComponent
  },
  {
    path:'mantenedor-pokemon',
    loadChildren:()=>import('./pages/mantenedor/pokemons/pokemon-module.module').then(m=>m.PokemonModule)
    ,canLoad:[AdminGuard]
  },
  {
    path:'mantenedor-type-pokemon',
    loadChildren:()=>import('./pages/mantenedor/typesPokemon/type-pokemon-module.module').then(m=>m.TypePokemonModule)
    ,canLoad:[AdminGuard]
  },
  {
    path: 'about',
    component : AboutComponent
  },
  {
    path: 'contact',
    component : ContactComponent
  },
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path: 'register',
    component : RegisterComponent
  },
  {
    path: '**',
    redirectTo : 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
