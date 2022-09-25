import { createReducer, on } from "@ngrx/store";
import { INITIAL_APP_STATE } from "src/app/types/app-state.types";
import { AppActionTypes } from "../app.actions";

export const setSelectedHuntAction = on(
  AppActionTypes.setSelectedHuntAction,
  (_, action) => {
    return action;
  }
);

export const clearSelectedHuntReducer = on(
  AppActionTypes.clearSelectedHuntAction,
  (_) => {

    return null;
  }
);

export const selectedHuntReducers = createReducer(
  INITIAL_APP_STATE,
  clearSelectedHuntReducer,
  setSelectedHuntAction,
)
