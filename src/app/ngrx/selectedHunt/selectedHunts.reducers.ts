import { createReducer, on } from "@ngrx/store";
import { AppState, INITIAL_APP_STATE } from "src/app/types/app-state.types";
import { AppActionTypes } from "../app.actions";

export const currentHuntReducer = createReducer(
  INITIAL_APP_STATE,

  on(AppActionTypes.setSelectedHuntAction,
    (state: AppState, action) => {
      if (action.index !== null) {
        state.selectedHuntIndex = action.index;
        state.selectedHunt = state.currentHunts[action.index];
      }

      return { ...state }
    }
  ),
)
