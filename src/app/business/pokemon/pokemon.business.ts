import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokemonClient } from 'pokenode-ts';

import { map, Observable, take } from 'rxjs';
import { AppActionTypes } from 'src/app/ngrx/app.actions';
import { AppState } from 'src/app/types/app-state.types';
import { Hunt, HuntsStateType } from 'src/app/types/Hunts.types';
import { gameImgUrlLookup } from 'src/app/types/pokemonFound.types';
import { StorageBusiness } from '../storage/storage.business';

@Injectable({
  providedIn: 'root'
})
export class PokemonBusiness {
  pokemonApi = new PokemonClient();

  constructor(
    private readonly _storageBusiness: StorageBusiness,
    private readonly _store$: Store<AppState>,
  ) {}

  getPokemonPrev(): Observable<Hunt[]> {
    return this._store$.select((s) => s.previousHunts);
  }

  setPokemonPrev(list: Hunt[]): void {
    this._store$.dispatch(
      AppActionTypes.setPreviousHuntsAction({ list })
    );
    this.persistPokemonLists();
  }

  getPokemonCurr(): Observable<HuntsStateType> {
    return this._store$.select((s) => s.currentHunts);
  }

  setPokemonCurr(list: HuntsStateType): void {
    this._store$.dispatch(
      AppActionTypes.setCurrentHuntsAction({ list: list })
    );
    this.persistPokemonLists();
  }

  persistPokemonLists(): void {
    this._store$.pipe(
      take(1),
      map((s) => {
        this._storageBusiness.setPokemonFoundToLocal(s);
      })
    ).subscribe();
  }

  async addCurrectPokemonImgUrl(currentHunt: Hunt) {
    if (currentHunt.species !== null) {
      await this.getPokemonImgUrl(currentHunt.species)
        .then((url) => { currentHunt.pokemonImgUrl = url; return currentHunt })
        .then((currentHunt) => {
          this._store$.dispatch(
            AppActionTypes.updateCurrentHuntsAction(currentHunt)
          );
        });
    }
  }

  async getPokemonImgUrl(pokemonName: string): Promise<string | null> {
    return this.pokemonApi.getPokemonByName(pokemonName)
    .then(pokemon => pokemon?.sprites?.front_shiny)
    .catch(() => null);
  }

  getGameImgUrl(hunt: Hunt): string {
    const gameTyped = hunt.foundOnGame.toLowerCase() as keyof typeof gameImgUrlLookup;
    return gameImgUrlLookup[gameTyped];
  }
}
