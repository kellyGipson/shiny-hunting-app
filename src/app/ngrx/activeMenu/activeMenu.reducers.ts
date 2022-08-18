import { createReducer, on } from "@ngrx/store";
import { INITIAL_APP_STATE } from "src/app/types/app-state.types";
import { AppActionTypes } from "../app.actions";

export const setActiveMenuReducer = createReducer(
  INITIAL_APP_STATE,
  
  on(AppActionTypes.setActiveMenuAction,
    (state, action) => {
      state.activeMenu = action.menu;
      return { ...state };
    }
  ),
)
