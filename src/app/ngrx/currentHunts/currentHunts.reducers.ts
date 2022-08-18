import { createReducer, on } from "@ngrx/store";
import { AppState, INITIAL_APP_STATE } from "src/app/types/app-state.types";
import { AppActionTypes } from "../app.actions";

export const currentHuntsReducer = createReducer(
  INITIAL_APP_STATE,

  on(AppActionTypes.addCurrentHuntsAction,
    (state: AppState, action) => {
      state.currentHunts.push(action)

      return { ...state };
    }
  ),

  on(AppActionTypes.deleteCurrentHuntsAction,
    (state: AppState, action) => {
      state.currentHunts.splice(action.index, 1);

      return { ...state }
    }
  ),

  on(AppActionTypes.updateCurrentHuntsAction,
    (state: AppState, action) => {
      state.currentHunts.splice(action.index, 1, {
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

  on(AppActionTypes.setCurrentHuntsAction,
    (state: AppState, action) => {
      return { ...state, currentHunts: action.list }
    }
  ),
)
