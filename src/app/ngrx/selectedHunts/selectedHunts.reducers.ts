import { createReducer, on } from "@ngrx/store";
import copy from "fast-copy";
import { deepEqual } from "fast-equals";
import { INITIAL_APP_STATE } from "src/app/types/app-state.types";
import { Hunt } from "src/app/types/Hunts.types";
import { AppActionTypes } from "../app.actions";
import { get } from "lodash";

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
    newSelectedHunts.push(action.hunt);

    return newSelectedHunts;
  }
);

export const updateSelectedHuntsAction = on(
  AppActionTypes.updateSelectedHuntAction,
  (state: Hunt[], action) => {
    let newState = copy(state);
    const index = newState.findIndex((hunt) => deepEqual(hunt.id, action.hunt.id));
    newState.splice(index, 1, action.hunt);
    return newState;
  }
);

export const deleteSelectedHuntsAction = on(
  AppActionTypes.deleteSelectedHuntAction,
  (state: Hunt[], action) => {
    let newSelectedHunts = copy(state);
    const index = newSelectedHunts.findIndex((hunt) => deepEqual(hunt.id, action.hunt.id));
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
