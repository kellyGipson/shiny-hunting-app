import { createReducer, on } from "@ngrx/store";
import copy from "fast-copy";
import { INITIAL_APP_STATE } from "src/app/types/app-state.types";
import { Hunt } from "src/app/types/Hunts.types";
import { AppActionTypes } from "../app.actions";
import { deepEqual } from "fast-equals";

export const addPreviousHuntsReducer = on(
  AppActionTypes.addPreviousHuntsAction,
  (state: Hunt[], action) => {
    let newState = copy(state);
    newState.push({
      id: action.id,
      capturedOn: action.capturedOn,
      count: action.count,
      foundOnGame: action.foundOnGame,
      gameImgUrl: action.gameImgUrl,
      huntStarted: action.huntStarted,
      method: action.method,
      pokemonImgUrl: action.pokemonImgUrl,
      species: action.species,
      interval: action.interval,
    })
    return newState;
  }
);

export const deletePreviousHuntsReducer = on(
  AppActionTypes.deletePreviousHuntsAction,
  (state: Hunt[], action) => {
    let newState = copy(state);
    const index = state.findIndex((hunt) => deepEqual(hunt.id, action.id));
    newState.splice(index, 1);

    return newState;
  }
);

export const updatePreviousHuntsReducer = on(
  AppActionTypes.updatePreviousHuntsAction,
  (state: Hunt[], action) => {
    let newState = copy(state);
    const index = state.findIndex((hunt) => deepEqual(hunt.id, action.id));
    newState.splice(index, 1, {
      id: action.id,
      capturedOn: action.capturedOn,
      count: action.count,
      foundOnGame: action.foundOnGame,
      gameImgUrl: action.gameImgUrl,
      huntStarted: action.huntStarted,
      method: action.method,
      pokemonImgUrl: action.pokemonImgUrl,
      species: action.species,
      interval: action.interval,
    })

    return newState;
  }
);

export const setPreviousHuntsReducer = on(
  AppActionTypes.setPreviousHuntsAction,
  (_, action) => {
    return action;
  }
);

export const previousHuntsReducers = createReducer(
  INITIAL_APP_STATE.previousHunts,
  addPreviousHuntsReducer,
  deletePreviousHuntsReducer,
  updatePreviousHuntsReducer,
  setPreviousHuntsReducer,
)
