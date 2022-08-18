import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Pokemon } from "pokenode-ts";
import { map, mergeMap, take, tap } from "rxjs";
import { StorageService } from "src/app/services/storage/storage.service";
import { AppState } from "src/app/types/app-state.types";
import { PokemonDataStorage } from "src/app/types/pokemonFound.types";
import { AppActionTypes } from "../app.actions";

@Injectable()
export class CurrentHuntsEffects {

  addCurrentHuntsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AppActionTypes.addCurrentHuntsAction),
      tap((s) => {
        if (this.currentData !== null) {
          this._storageService.setPokemonFoundToLocal(this.currentData);
        }
      }),
    )
  );

  deleteCurrentHuntsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AppActionTypes.deleteCurrentHuntsAction),
      tap((s) => {
        if (this.currentData !== null) {
          this._storageService.setPokemonFoundToLocal(this.currentData);
        }
      }),
    )
  );

  updateCurrentHuntsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AppActionTypes.updateCurrentHuntsAction),
      tap((s) => {
        if (this.currentData !== null) {
          this._storageService.setPokemonFoundToLocal(this.currentData);
        }
      }),
    )
  );

  setCurrentHuntsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AppActionTypes.setCurrentHuntsAction),
      tap((s) => {
        if (this.currentData !== null) {
          this._storageService.setPokemonFoundToLocal(this.currentData);
        }
      }),
    )
  );

  get currentData(): PokemonDataStorage | null {
    let currentData: PokemonDataStorage | null = null;
    this._store$.pipe(
      take(1),
      map((s) => {
        currentData = {
          currentHunt: null,
          currentHunts: s.currentHunts,
          previousHunts: s.previousHunts,
        }
      })
    ).subscribe();
    return currentData;
  }

  constructor(
    private readonly _actions$: Actions,
    private readonly _store$: Store<AppState>,
    private readonly _storageService: StorageService,
  ) {}
}
