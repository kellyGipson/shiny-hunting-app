import { createReducer, on } from "@ngrx/store";
import { AddShinyFormOpenStateType } from "src/app/types/addShinyFormOpen.types";
import { INITIAL_APP_STATE } from "src/app/types/app-state.types";
import { AppActionTypes } from "../app.actions";

export const toggleAddShinyFormOpenReducer = on(
  AppActionTypes.toggleAddShinyFormOpenAction,
  (state: AddShinyFormOpenStateType) => {
    state = !state;
    return state;
  }
);

export const setAddShinyFormOpenReducer = on(
  AppActionTypes.setAddShinyFormOpenAction,
  (state: AddShinyFormOpenStateType, action) => {
    state = action.addShinyFormOpen;
    return state;
  }
);

export const addShinyFormOpenReducers = createReducer(
  INITIAL_APP_STATE.addShinyFormOpen,
  toggleAddShinyFormOpenReducer,
)
