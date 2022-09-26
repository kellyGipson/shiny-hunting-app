import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, take, tap } from "rxjs";
import { AppActionTypes } from "src/app/ngrx/app.actions";
import { AppState } from "src/app/types/app-state.types";
import { CurrentHunt } from "src/app/types/currentHunts.types";

@Injectable({
  providedIn: 'root'
})
export class SelectedHuntBusiness {
  constructor(
    private readonly _store$: Store<AppState>
  ) {}

  getSelectedHunt$(): Observable<CurrentHunt> {
    return this._store$.select((s) => s.selectedHunt);
  }

  getSelectedHunt(): CurrentHunt {
    let hunt: CurrentHunt = null;

    this._store$.pipe(
      take(1),
      tap((s) => {
        hunt = s.selectedHunt;
      })
    ).subscribe();

    return hunt;
  }

  setSelectedHunt(hunt: CurrentHunt): void {
    this._store$.dispatch(
      AppActionTypes.setSelectedHuntAction(hunt)
    );
  }
}
