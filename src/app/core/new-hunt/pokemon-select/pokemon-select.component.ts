import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { AppActionTypes } from 'src/app/ngrx/app.actions';

import { AppBusiness } from 'src/app/business/app/app.business';
import { PokemonBusiness } from 'src/app/business/pokemon/pokemon.business';
import { AppState } from 'src/app/types/app-state.types';
import { ActiveMenuType } from 'src/app/types/activeMenu.types';
import { PokemonJSONType } from 'src/app/types/pokemonData.types';

@Component({
  selector: 'app-pokemon-select',
  templateUrl: './pokemon-select.component.html',
  styleUrls: ['./pokemon-select.component.scss', '../../../app.component.scss']
})
export class PokemonSelectComponent implements OnInit {
  readonly activeMenu: Observable<ActiveMenuType> = this._appBusiness.getActiveMenu();

  pokemonList: PokemonJSONType[] = [];
  searchList: PokemonJSONType[] = [];
  namesReady: boolean = false;

  constructor(
    private readonly _appBusiness: AppBusiness,
    private readonly _pokemonBusiness: PokemonBusiness,
    private readonly _store$: Store<AppState>,
  ) {}

  async ngOnInit() {
    await this.initPokemonList()
      .then(() => {
        this.pokemonList.forEach(pokemon => {
          const capitalName = this.convertToCapital(pokemon.name);
          pokemon.name = capitalName;
        });
      })
      .then(() => {
        this.searchList = this.pokemonList;
        this.namesReady = true;
      })
  }

  async initPokemonList() {
    await fetch('/assets/pokemonList.json', { mode: 'no-cors'})
      .then(res => res.json())
      .then((parsed: PokemonJSONType[]) => {
        this.pokemonList = parsed;
        return parsed;
      });
  }

  convertToCapital(text: string): string {
    let capital = text[0].toUpperCase() + text.slice(1);
    return capital;
  }

  search(e: any) {
    this.searchList = [];
    for(let i = 0; i < this.pokemonList.length; i++) {
      if(this.pokemonList[i].name.toLowerCase().includes(e.target.value.toLowerCase())) {
        this.searchList.push(this.pokemonList[i]);
      }
    }
  }

  pokemonClick(pokemon: PokemonJSONType) {
    this._store$.dispatch(
      AppActionTypes.addCurrentHuntsAction({
        species: pokemon.name.toLowerCase(),
        huntStarted: new Date(),
        count: 0,
        capturedOn: null,
        foundOnGame: null,
        method: null,
        pokemonImgUrl: null,
      })
    );
    this._appBusiness.progressToNextPage();
  }
}
