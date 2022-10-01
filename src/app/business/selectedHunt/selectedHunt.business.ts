import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, take, tap } from "rxjs";
import { AppActionTypes } from "src/app/ngrx/app.actions";
import { AppState } from "src/app/types/app-state.types";
import { Hunt } from "src/app/types/Hunts.types";

@Injectable({
  providedIn: 'root'
})
export class SelectedHuntBusiness {
  constructor(
    private readonly _store$: Store<AppState>
  ) {}

  getSelectedHunt$(): Observable<Hunt[]> {
    return this._store$.select((s) => s.selectedHunts);
  }

  getSelectedHunt(): Hunt[] {
    let hunt: Hunt[] = null;

    this._store$.pipe(
      take(1),
      tap((s) => {
        hunt = s.selectedHunts;
      })
    ).subscribe();

    return hunt;
  }

  setSelectedHunt(hunt: Hunt): void {
    this._store$.dispatch(
      AppActionTypes.setSelectedHuntAction({ list: [hunt] })
    );
  }
}
