import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private userService:UserService,private pokemonService:PokemonService) { }

  ngOnInit(

  ): void {
    //this.userService.validateUserLogged();
    this.pokemonService.success = false;
    this.pokemonService.successMsj= "";
  }

}
