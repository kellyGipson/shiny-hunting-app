import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokemonClient } from 'pokenode-ts';

import { from, map, Observable, take } from 'rxjs';
import { AppActionTypes } from 'src/app/ngrx/app.actions';
import { AppState } from 'src/app/types/app-state.types';

import { CurrentHunt, PreviousHunt } from 'src/app/types/pokemonFound.types';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemonApi = new PokemonClient();

  constructor(
    private readonly _storageService: StorageService,
    private readonly _store$: Store<AppState>,
  ) {}

  getPokemonPrev(): Observable<PreviousHunt[]> {
    return this._store$.select((s) => s.previousHunts);
  }

  setPokemonPrev(list: PreviousHunt[]): void {
    this._store$.dispatch(
      AppActionTypes.setPreviousHuntsAction({ list: list })
    );
    this.persistPokemonLists();
  }

  getPokemonCurr(): Observable<CurrentHunt[]> {
    return this._store$.select((s) => s.currentHunts);
  }

  setPokemonCurr(list: CurrentHunt[]): void {
    this._store$.dispatch(
      AppActionTypes.setCurrentHuntsAction({ list: list })
    );
    this.persistPokemonLists();
  }

  persistPokemonLists(): void {
    this._store$.pipe(
      take(1),
      map((s) => {
        this._storageService.setPokemonFoundToLocal({
          currentHunt: null,
          currentHunts: s.currentHunts,
          previousHunts: s.previousHunts,
        });
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
            AppActionTypes.updateCurrentHuntsAction({ ...currentHunt, index: currentHuntIndex })
          );
        });
    }
  }

  async getPokemonImgUrl(pokemonName: string): Promise<string | null> {
    return this.pokemonApi.getPokemonByName(pokemonName).then(pokemon => pokemon?.sprites?.front_shiny);
  }
}
