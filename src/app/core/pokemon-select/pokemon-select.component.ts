import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AppService } from 'src/app/services/app/app.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { activeMenuType } from 'src/app/types/app.types';
import { PokemonJSONType } from 'src/app/types/pokemonData.types';
import { CurrentHunt } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-pokemon-select',
  templateUrl: './pokemon-select.component.html',
  styleUrls: ['./pokemon-select.component.css', '../../app.component.css']
})
export class PokemonSelectComponent implements OnInit {
  readonly activeMenu: Observable<activeMenuType> = this._appService.getActiveMenu();
  readonly currentHunt: Observable<CurrentHunt> = this._pokemonService.getPokemonCurr();

  pokemonList: PokemonJSONType[] = [];
  searchList: PokemonJSONType[] = [];
  namesReady: boolean = false;

  constructor(
    private readonly _appService: AppService,
    private readonly _pokemonService: PokemonService,
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
      if(this.pokemonList[i].name.toLowerCase().includes(e.target.value)) {
        this.searchList.push(this.pokemonList[i]);
      }
    }
  }

  pokemonClick(pokemon: PokemonJSONType) {
    // update the current hunt
    this._pokemonService.setPokemonCurr({
      ...this._pokemonService.pokemonCurrSource.value,
      species: pokemon.name,
      huntStarted: new Date(),
      count: 0,
    });
    // switch to game page
    this._appService.progressToNextPage();
  }
}
