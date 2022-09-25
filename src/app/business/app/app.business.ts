import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { AppActionTypes } from 'src/app/ngrx/app.actions';
import { AppState } from 'src/app/types/app-state.types';

import { ActiveMenuType } from 'src/app/types/activeMenu.types';

@Injectable({
  providedIn: 'root'
})
export class AppBusiness {

  constructor(
    private readonly _store$: Store<AppState>,
  ) {}

  getCurrentAppState(): AppState {
    let appState: AppState;

    this._store$.pipe(
      take(1),
      map((state) => {
        appState = state;
      })
    ).subscribe();

    return appState;
  }

  setAppState(state: AppState): void {
    this._store$.dispatch(
      AppActionTypes.setActiveMenuAction({ activeMenu: state.activeMenu })
    );
    this._store$.dispatch(
      AppActionTypes.setCurrentHuntsAction({ list: state.currentHunts })
    );
    this._store$.dispatch(
      AppActionTypes.setCurrentNewPageAction({ currentNewPage: state.currentNewPage})
    );
    this._store$.dispatch(
      AppActionTypes.setPreviousHuntsAction({ previousHunts: state.previousHunts })
    );
    this._store$.dispatch(
      AppActionTypes.setAddShinyFormOpenAction({ addShinyFormOpen: state.addShinyFormOpen })
    );
  }

  getActiveMenu$(): Observable<ActiveMenuType> {
    return this._store$.select((s) => s.activeMenu);
  }

  setActiveMenu(activeMenu: ActiveMenuType): void {
    this._store$.dispatch(
      AppActionTypes.setActiveMenuAction({ activeMenu })
    );
  }

  getAddShinyOpen(): Observable<boolean> {
    return this._store$.select((s) => s.addShinyFormOpen);
  }

  toggleAddShinyOpen(): void {
    this._store$.dispatch(
      AppActionTypes.toggleAddShinyFormOpenAction()
    );
  }

  getCurrentNewPage$(): Observable<'pokemon' | 'game' | 'method'> {
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
