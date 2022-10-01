import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import copy from "fast-copy";
import { AppActionTypes } from "src/app/ngrx/app.actions";
import { AppState } from "src/app/types/app-state.types";
import { Hunt } from "src/app/types/Hunts.types";

@Injectable({
  providedIn: 'root'
})
export class PreviousHuntsBusiness {
  constructor(
    private readonly _store$: Store<AppState>
  ) {}

  addPreviousHunt(hunt: Hunt): void {
    let shiny = copy(hunt);
    shiny.capturedOn = new Date();
    this._store$.dispatch(
      AppActionTypes.addPreviousHuntsAction(shiny)
    );
  }
}
