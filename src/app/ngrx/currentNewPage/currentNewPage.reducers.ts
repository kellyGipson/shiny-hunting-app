import { createReducer, on } from "@ngrx/store";
import { AppState, INITIAL_APP_STATE } from "src/app/types/app-state.types";
import { CurrentNewPageType } from "src/app/types/currentNewPage.types";
import { AppActionTypes } from "../app.actions";

export const setCurrentNewPageReducer = on(
  AppActionTypes.setCurrentNewPageAction,
  (state: CurrentNewPageType, action) => {
    if (!action.currentNewPage) {
      throw new Error(`No currentNewPage in payload. In Action: ${action.type}`);
    }

    state = action.currentNewPage;
    return state;
  }
);

export const advanceCurrentNewPageReducer = on(
  AppActionTypes.advanceCurrentNewPageAction,
  (state: CurrentNewPageType) => {
    switch(state) {
      case 'pokemon':
        state = 'game'
        break;
      case 'game':
        state = 'method'
        break;
      case 'method':
        state = 'pokemon'
        break;
    }
    return state;
  }
);

export const recedeCurrentNewPageReducer = on(
  AppActionTypes.recedeCurrentNewPageAction,
  (state: CurrentNewPageType) => {
    switch(state) {
      case 'pokemon':
        break;
      case 'game':
        state = 'pokemon';
        break;
      case 'method':
        state = 'game';
        break;
      }

    return state;
  }
);


export const currentNewPageReducers = createReducer(
  INITIAL_APP_STATE.currentNewPage,
  setCurrentNewPageReducer,
  advanceCurrentNewPageReducer,
  recedeCurrentNewPageReducer,
)
