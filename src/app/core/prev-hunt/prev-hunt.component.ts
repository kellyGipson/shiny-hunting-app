import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';

import { AppService } from 'src/app/services/app/app.service';
import { CounterService } from 'src/app/services/counter/counter.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { activeMenuType } from 'src/app/types/app.types';
import { PokemonFound, PokemonFoundList } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-prev-hunt',
  templateUrl: './prev-hunt.component.html',
  styleUrls: ['./prev-hunt.component.css', '../../app.component.css']
})
export class PokemonComponent implements OnInit {
  activeMenu: Observable<activeMenuType> = this._appService.getActiveMenu();
  addShinyOpen: Observable<boolean> = this._appService.getAddShinyOpen();
  pokemonFound: Observable<PokemonFoundList> = this._pokemonService.getPokemonFound();
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

    const newPokemonList: PokemonFoundList = [
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

  onPokemonDelete(pokemonToDelete: PokemonFound): void {
    const newPokemonList: PokemonFoundList = this._pokemonService.pokemonFoundSource.value.filter(pokemon => pokemon !== pokemonToDelete);
    this._pokemonService.setPokemonFound(newPokemonList);
  }
}
