import { createReducer, on } from "@ngrx/store";
import { AppState, INITIAL_APP_STATE } from "src/app/types/app-state.types";
import { AppActionTypes } from "../app.actions";

export const previousHuntsReducer = createReducer(
  INITIAL_APP_STATE,

  on(AppActionTypes.addPreviousHuntsAction,
    (state: AppState, action) => {
      state.previousHunts.push(action)

      return { ...state };
    }
  ),

  on(AppActionTypes.deletePreviousHuntsAction,
    (state: AppState, action) => {
      state.previousHunts.splice(action.index, 1);

      return { ...state };
    }
  ),

  on(AppActionTypes.updatePreviousHuntsAction,
    (state: AppState, action) => {
      state.previousHunts.splice(action.index, 1, {
        capturedOn: action.capturedOn,
        count: action.count,
        foundOnGame: action.foundOnGame,
        huntStarted: action.huntStarted,
        method: action.method,
        pokemonImgUrl: action.pokemonImgUrl,
        species: action.species,
      })

      return { ...state }
    }
  ),

  on(AppActionTypes.setPreviousHuntsAction,
    (state: AppState, action) => {
      state.previousHunts = action.list;

      return { ...state }
    }
  ),
)
