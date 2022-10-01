import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import copy from "fast-copy";
import { AppActionTypes } from "src/app/ngrx/app.actions";
import { AppState } from "src/app/types/app-state.types";
import { CurrentHunt } from "src/app/types/currentHunts.types";

@Injectable({
  providedIn: 'root'
})
export class PreviousHuntsBusiness {
  constructor(
    private readonly _store$: Store<AppState>
  ) {}

  addPreviousHunt(hunt: CurrentHunt): void {
    let shiny = copy(hunt);
    shiny.capturedOn = new Date();
    this._store$.dispatch(
      AppActionTypes.addPreviousHuntsAction(shiny)
    );
  }
}
