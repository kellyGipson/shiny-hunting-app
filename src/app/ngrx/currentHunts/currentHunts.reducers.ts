import { createReducer, on } from "@ngrx/store";
import copy from "fast-copy";
import { INITIAL_APP_STATE } from "src/app/types/app-state.types";
import { CurrentHuntsStateType } from "src/app/types/currentHunts.types";
import { AppActionTypes } from "../app.actions";

export const addCurrentHuntsReducer = on(
  AppActionTypes.addCurrentHuntsAction,
  (state: CurrentHuntsStateType, action) => {
    let newCurrentHunts = copy(state);
    newCurrentHunts.push({
      capturedOn: action.capturedOn,
      count: action.count,
      foundOnGame: action.foundOnGame,
      huntStarted: action.huntStarted,
      method: action.method,
      pokemonImgUrl: action.pokemonImgUrl,
      species: action.species
    })
    return newCurrentHunts;
  }
);

export const deleteCurrentHuntsReducer = on(
  AppActionTypes.deleteCurrentHuntsAction,
  (state: CurrentHuntsStateType, action) => {
    state.splice(action.index, 1);

    return state;
  }
);

export const updateCurrentHuntsReducer = on(
  AppActionTypes.updateCurrentHuntsAction,
  (state: CurrentHuntsStateType, action) => {
    state.splice(action.index, 1, {
      capturedOn: action.capturedOn,
      count: action.count,
      foundOnGame: action.foundOnGame,
      huntStarted: action.huntStarted,
      method: action.method,
      pokemonImgUrl: action.pokemonImgUrl,
      species: action.species,
    });

    return state
  }
);

export const setCurrentHuntsAction = on(
  AppActionTypes.setCurrentHuntsAction,
  (_, action) => {
    return action.list;
  }
);

export const currentHuntsReducers = createReducer(
  INITIAL_APP_STATE,
  addCurrentHuntsReducer,
  deleteCurrentHuntsReducer,
  updateCurrentHuntsReducer,
  setCurrentHuntsAction,
)
