import { createReducer, on } from "@ngrx/store";
import copy from "fast-copy";
import { INITIAL_APP_STATE } from "src/app/types/app-state.types";
import { HuntsStateType } from "src/app/types/Hunts.types";
import { AppActionTypes } from "../app.actions";
import { deepEqual } from "fast-equals";

export const addCurrentHuntsReducer = on(
  AppActionTypes.addCurrentHuntsAction,
  (state: HuntsStateType, action) => {
    let newState = copy(state);
    newState.push(action.hunt);
    return newState;
  }
);

export const deleteCurrentHuntsReducer = on(
  AppActionTypes.deleteCurrentHuntsAction,
  (state: HuntsStateType, action) => {
    let newState: HuntsStateType = copy(state);
    const index = newState.findIndex((hunt) => deepEqual(hunt.id, action.hunt.id));
    newState.splice(index, 1);

    return newState;
  }
);

export const updateCurrentHuntsReducer = on(
  AppActionTypes.updateCurrentHuntsAction,
  (state: HuntsStateType, action) => {
    let newState: HuntsStateType = copy(state);
    const index = newState.findIndex((hunt) => deepEqual(hunt.id, action.hunt.id));
    newState.splice(index, 1, action.hunt);

    return newState;
  }
);

export const setCurrentHuntsAction = on(
  AppActionTypes.setCurrentHuntsAction,
  (_, action) => {
    if (action.list.length === 0 || !action.list) {
      throw new Error(`No currentHunts in payload. In Action: ${action.type}`);
    }

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
