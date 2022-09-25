import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { AppActionTypes } from 'src/app/ngrx/app.actions';

import { AppBusiness } from 'src/app/business/app/app.business';
import { PokemonBusiness } from 'src/app/business/pokemon/pokemon.business';
import { AppState } from 'src/app/types/app-state.types';
import { ActiveMenuType } from 'src/app/types/activeMenu.types';
import { PokemonJSONType } from 'src/app/types/pokemonData.types';
import { CurrentHunt } from 'src/app/types/currentHunts.types';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-pokemon-select',
  templateUrl: './pokemon-select.component.html',
  styleUrls: ['./pokemon-select.component.scss', '../../../app.component.scss']
})
export class PokemonSelectComponent implements OnInit {
  @Input() newHuntToCreate: CurrentHunt;
  readonly activeMenu: Observable<ActiveMenuType> = this._appBusiness.getActiveMenu$();

  pokemonList: PokemonJSONType[] = [];
  searchString: string = '';
  searchList: PokemonJSONType[] = [];
  namesReady: boolean = false;
  selectedPokemon: PokemonJSONType = null;

  constructor(
    private readonly _appBusiness: AppBusiness,
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

  search() {
    if (this.searchString === '') {
      this.searchList = this.pokemonList;
    }
    this.searchList = this.pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.searchString.toLowerCase()));
  }

  pokemonChanged(event: MatSelectionList) {
    this.selectedPokemon = event.selectedOptions.selected[0]?.value;
    if (this.selectedPokemon.name !== null && this.selectedPokemon.url !== null) {
      this.newHuntToCreate.species = this.selectedPokemon?.name;
      this.newHuntToCreate.pokemonImgUrl = this.selectedPokemon?.url;
    }
  }

  isNextButtonDisabled(): boolean {
    return this.selectedPokemon === null;
  }

  next(): void {
    this._appBusiness.progressToNextPage();
  }
}
