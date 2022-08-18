import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { AppActionTypes } from 'src/app/ngrx/app.actions';
import { AppState } from 'src/app/types/app-state.types';
import { emptyPokemonData, PokemonDataStorage } from 'src/app/types/pokemonFound.types';

import { activeMenuType } from '../../types/app.types';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private readonly _store$: Store<AppState>,
    private readonly _storageService: StorageService,
  ) {}

  initApp(): void {
    try {
      const initData: PokemonDataStorage = this._storageService.getPokemonFoundFromLocal()
      console.log(initData);
      if(initData.currentHunts === null) {
        this._store$.dispatch(
          AppActionTypes.setActiveMenuAction({ menu: 'Home'})
        );
      }
      //! temporary code, remove after pokemon are saved
      if (!!initData.currentHunt && !initData.currentHunts) {
        this._store$.dispatch(
          AppActionTypes.setCurrentHuntsAction({ list: [initData.currentHunt] }),
        );
      }
    } catch (error) {
      this._storageService.setPokemonFoundToLocal(emptyPokemonData);
      this._store$.dispatch(
        AppActionTypes.setActiveMenuAction({ menu: 'New'})
      );
    }
  }

  getActiveMenu(): Observable<activeMenuType> {
    return this._store$.select((s) => s.activeMenu);
  }

  setActiveMenu(menu: activeMenuType): void {
    this._store$.dispatch(
      AppActionTypes.setActiveMenuAction({ menu: menu })
    );
  }

  /**
   * @returns True if the shiny form is open
   */
  getAddShinyOpen(): Observable<boolean> {
    return this._store$.select((s) => s.addShinyFormOpen);
  }

  /**
   * Toggles the shiny form
   */
  toggleAddShinyOpen(): void {
    this._store$.dispatch(
      AppActionTypes.toggleAddShinyFormOpenAction()
    );
  }

  getCurrentNewPage(): Observable<'pokemon' | 'game' | 'method'> {
    return this._store$.select((s) => s.currentNewPage)
  }

  progressToNextPage(): void {
    this._store$.dispatch(
      AppActionTypes.advanceCurrentNewPageAction()
    );
  }

  goBackToLastPage(): void {
    this._store$.dispatch(
      AppActionTypes.recedeCurrentNewPageAction()
    );
  }
}
