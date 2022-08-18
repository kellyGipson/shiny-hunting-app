import { createReducer, on } from "@ngrx/store";
import { INITIAL_APP_STATE } from "src/app/types/app-state.types";
import { AppActionTypes } from "../app.actions";

export const addShinyFormOpenReducer = createReducer(
  INITIAL_APP_STATE,

  on(AppActionTypes.setActiveMenuAction,
    (state) => {
      state.addShinyFormOpen = !state.addShinyFormOpen;
      return { ...state };
    }
  ),
)
