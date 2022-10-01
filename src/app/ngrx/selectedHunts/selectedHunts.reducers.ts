import { createReducer, on } from "@ngrx/store";
import copy from "fast-copy";
import { INITIAL_APP_STATE } from "src/app/types/app-state.types";
import { Hunt } from "src/app/types/Hunts.types";
import { AppActionTypes } from "../app.actions";

export const setSelectedHuntsAction = on(
  AppActionTypes.setSelectedHuntAction,
  (_, action) => {
    return action.list;
  }
);

export const addSelectedHuntsAction = on(
  AppActionTypes.addSelectedHuntAction,
  (state: Hunt[], action) => {
    let newSelectedHunts = copy(state);
    newSelectedHunts.push({
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
    });
    return newSelectedHunts;
  }
);

export const updateSelectedHuntsAction = on(
  AppActionTypes.addSelectedHuntAction,
  (state: Hunt[], action) => {
    let newSelectedHunts = copy(state);
    const index = newSelectedHunts.findIndex((hunt) => hunt.id.toString() === action.id.toString());
    if (!index) {
      return state;
    }
    newSelectedHunts.splice(index, 1, {
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
    });
    return newSelectedHunts;
  }
);

export const deleteSelectedHuntsAction = on(
  AppActionTypes.addSelectedHuntAction,
  (state: Hunt[], action) => {
    let newSelectedHunts = copy(state);
    const index = newSelectedHunts.findIndex((hunt) => hunt.id.toString() === action.id.toString());
    if (!index) {
      return state;
    }
    newSelectedHunts.splice(index, 1);
    return newSelectedHunts;
  }
);

export const clearSelectedHuntsReducer = on(
  AppActionTypes.clearSelectedHuntAction,
  (_) => {
    return null;
  }
);

export const selectedHuntsReducers = createReducer(
  INITIAL_APP_STATE,
  clearSelectedHuntsReducer,
  addSelectedHuntsAction,
  updateSelectedHuntsAction,
  deleteSelectedHuntsAction,
  setSelectedHuntsAction,
)
