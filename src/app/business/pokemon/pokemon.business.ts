import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokemonClient } from 'pokenode-ts';

import { map, Observable, take } from 'rxjs';
import { AppActionTypes } from 'src/app/ngrx/app.actions';
import { AppState } from 'src/app/types/app-state.types';
import { CurrentHunt, CurrentHuntsStateType } from 'src/app/types/currentHunts.types';
import { PreviousHunts } from 'src/app/types/previousHunts.types';
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

  getPokemonPrev(): Observable<PreviousHunts> {
    return this._store$.select((s) => s.previousHunts);
  }

  setPokemonPrev(previousHunts: PreviousHunts): void {
    this._store$.dispatch(
      AppActionTypes.setPreviousHuntsAction({ previousHunts })
    );
    this.persistPokemonLists();
  }

  getPokemonCurr(): Observable<CurrentHuntsStateType> {
    return this._store$.select((s) => s.currentHunts);
  }

  setPokemonCurr(list: CurrentHuntsStateType): void {
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

  async addCurrectPokemonImgUrl(currentHunt: CurrentHunt) {
    let currentHuntIndex: number;
    this._store$.pipe(
      take(1),
      map((s) => {
        currentHuntIndex = s.currentHunts.length;
      })
    ).subscribe();

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
}
