import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, take, tap } from "rxjs";
import { StorageService } from "src/app/services/storage/storage.service";
import { AppState } from "src/app/types/app-state.types";
import { PokemonDataStorage } from "src/app/types/pokemonFound.types";
import { AppActionTypes } from "../app.actions";

@Injectable()
export class PreviousHuntsEffects {

  addPreviousHuntsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AppActionTypes.addPreviousHuntsAction),
      tap((s) => {
        if (this.currentData !== null) {
          this._storageService.setPokemonFoundToLocal(this.currentData);
        }
      }),
    )
  );

  deletePreviousHuntsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AppActionTypes.deletePreviousHuntsAction),
      tap((s) => {
        if (this.currentData !== null) {
          this._storageService.setPokemonFoundToLocal(this.currentData);
        }
      }),
    )
  );

  updatePreviousHuntsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AppActionTypes.updatePreviousHuntsAction),
      tap((s) => {
        if (this.currentData !== null) {
          this._storageService.setPokemonFoundToLocal(this.currentData);
        }
      }),
    )
  );

  setPreviousHuntsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AppActionTypes.setPreviousHuntsAction),
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
