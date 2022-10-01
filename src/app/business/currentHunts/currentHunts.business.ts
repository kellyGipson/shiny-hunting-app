import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppActionTypes } from "src/app/ngrx/app.actions";
import { AppState } from "src/app/types/app-state.types";
import { Hunt } from "src/app/types/Hunts.types";

@Injectable({
  providedIn: 'root'
})
export class CurrentHuntsBusiness {
  constructor(
    private readonly _store$: Store<AppState>
  ) {}

  getCurrentHunts$(): Observable<Hunt[]> {
    return this._store$.select((s) => s.currentHunts);
  }

  deleteCurrentHunt(hunt: Hunt): void {
    this._store$.dispatch(
      AppActionTypes.deleteCurrentHuntsAction(hunt)
    );
  }

  updateSelectedHunt(hunt: Hunt): void {
    this._store$.dispatch(
      AppActionTypes.updateCurrentHuntsAction(hunt)
    );
  }
}
