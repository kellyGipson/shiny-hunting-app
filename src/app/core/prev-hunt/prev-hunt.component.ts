import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';

import { AppService } from 'src/app/services/app/app.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { activeMenuType } from 'src/app/types/app.types';
import { emptyPokemonData, PreviousHunt, PreviousHunts } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-prev-hunt',
  templateUrl: './prev-hunt.component.html',
  styleUrls: ['./prev-hunt.component.css', '../../app.component.css']
})
export class PokemonComponent implements OnInit {
  activeMenu: Observable<activeMenuType> = this._appService.getActiveMenu();
  addShinyOpen: Observable<boolean> = this._appService.getAddShinyOpen();
  pokemonFound: Observable<PreviousHunts> = this._pokemonService.getPokemonPrev();

  species: FormControl = new FormControl(this._pokemonService.pokemonCurrSource.value.species || null);
  count: FormControl = new FormControl(this._pokemonService.pokemonCurrSource.value.count || null);
  foundOnGame: FormControl = new FormControl(this._pokemonService.pokemonCurrSource.value.foundOnGame || null);
  method: FormControl = new FormControl(this._pokemonService.pokemonCurrSource.value.method || null);

  constructor(
    private readonly _appService: AppService,
    private readonly _pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
  }

  onToggleShinyForm(): void {
    this._appService.toggleAddShinyOpen();
  }

  onShinySubmit(e: Event): void {
    if(e)e.preventDefault();

    const newPokemonList: PreviousHunts = [
      {
        species: this.species.value,
        count: this.count.value,
        foundOnGame: this.foundOnGame.value,
        method: this.method.value,
        huntStarted: this._pokemonService.pokemonCurrSource.value.huntStarted,
        capturedOn: new Date(),
      },
      ...this._pokemonService.pokemonPrevSource.value
    ];

    this._pokemonService.setPokemonPrev(newPokemonList);
    this._pokemonService.setPokemonCurr({ ...emptyPokemonData.currentHunt, count: 0 });
    this.species.setValue("");
    this.count.setValue(0);
    this.foundOnGame.setValue("");
    this.method.setValue("");
  }

  onPokemonDelete(pokemonToDelete: PreviousHunt): void {
    const newPokemonList: PreviousHunts = this._pokemonService.pokemonPrevSource.value.filter(pokemon => pokemon !== pokemonToDelete);
    this._pokemonService.setPokemonPrev(newPokemonList);
  }
}
