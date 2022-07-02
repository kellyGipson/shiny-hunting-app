import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';

import { AppService } from 'src/app/services/app/app.service';
import { CounterService } from 'src/app/services/counter/counter.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { activeMenuType } from 'src/app/types/app.types';
import { IPokemonFound, IPokemonFoundList } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css', '../../app.component.css']
})
export class PokemonComponent implements OnInit {
  activeMenu: Observable<activeMenuType> = this._appService.getActiveMenu();
  addShinyOpen: Observable<boolean> = this._appService.getAddShinyOpen();
  pokemonFound: Observable<IPokemonFoundList> = this._pokemonService.getPokemonFound();
  pokemonName: FormControl = new FormControl(""); // TODO: add games, and pokemon names, etc(pokeapi)
  pokemonEncounters: FormControl = new FormControl(this._counterService.currentCountSource.value);

  constructor(
    private readonly _appService: AppService,
    private readonly _pokemonService: PokemonService,
    private readonly _counterService: CounterService,
  ) { }

  ngOnInit(): void {
  }

  onToggleShinyForm(): void {
    this._appService.toggleAddShinyOpen();
  }

  onShinySubmit(e: Event): void {
    if(e)e.preventDefault();

    const newPokemonList: IPokemonFoundList = [
      ...this._pokemonService.pokemonFoundSource.value,
      {
        pokemonSpecies: this.pokemonName.value,
        encounterCount: this.pokemonEncounters.value,
      }
    ];

    this._pokemonService.setPokemonFound(newPokemonList);
    this._counterService.setCurrentCount(0);
    this.pokemonName.setValue("");
    this.pokemonEncounters.setValue(0);
  }

  onPokemonDelete(pokemonToDelete: IPokemonFound): void {
    const newPokemonList: IPokemonFoundList = this._pokemonService.pokemonFoundSource.value.filter(pokemon => pokemon !== pokemonToDelete);
    this._pokemonService.setPokemonFound(newPokemonList);
  }
}
