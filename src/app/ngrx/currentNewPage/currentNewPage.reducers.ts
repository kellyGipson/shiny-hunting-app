import { createReducer, on } from "@ngrx/store";
import { INITIAL_APP_STATE } from "src/app/types/app-state.types";
import { AppActionTypes } from "../app.actions";

export const currentNewPageReducer = createReducer(
  INITIAL_APP_STATE,

  on(AppActionTypes.setCurrentNewPageAction,
    (state, action) => {
      state.currentNewPage = action.currentNewPage;
      return { ...state };
    }
  ),

  on(AppActionTypes.advanceCurrentNewPageAction,
    (state) => {
      switch(state.currentNewPage) {
        case 'pokemon':
          state.currentNewPage = 'game'
          break;
        case 'game':
          state.currentNewPage = 'method'
          break;
        case 'method':
          state.currentNewPage = 'pokemon'
          break;
      }
      return { ...state };
    }
  ),

  on(AppActionTypes.recedeCurrentNewPageAction,
    (state) => {
      switch(state.currentNewPage) {
        case 'pokemon':
          break;
        case 'game':
          state.currentNewPage = 'pokemon';
          break;
        case 'method':
          state.currentNewPage = 'game';
          break;
      }

      return { ...state }
    }
  ),
)
