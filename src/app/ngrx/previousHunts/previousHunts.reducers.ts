import { createReducer, on } from "@ngrx/store";
import { INITIAL_APP_STATE } from "src/app/types/app-state.types";
import { PreviousHunts } from "src/app/types/previousHunts.types";
import { AppActionTypes } from "../app.actions";

export const addPreviousHuntsReducer = on(
  AppActionTypes.addPreviousHuntsAction,
  (state: PreviousHunts, action) => {
    state.push(action)

    return { ...state };
  }
);

export const deletePreviousHuntsReducer = on(
  AppActionTypes.deletePreviousHuntsAction,
  (state: PreviousHunts, action) => {
    state.splice(action.index, 1);

    return { ...state };
  }
);

export const updatePreviousHuntsReducer = on(
  AppActionTypes.updatePreviousHuntsAction,
  (state: PreviousHunts, action) => {
    state.splice(action.index, 1, {
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
);

export const setPreviousHuntsReducer = on(
  AppActionTypes.setPreviousHuntsAction,
  (_, action) => {
    return action.previousHunts
  }
);

export const previousHuntsReducers = createReducer(
  INITIAL_APP_STATE.previousHunts,
  addPreviousHuntsReducer,
  deletePreviousHuntsReducer,
  updatePreviousHuntsReducer,
  setPreviousHuntsReducer,
)
