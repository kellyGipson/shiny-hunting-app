import { createReducer, on } from '@ngrx/store';
import { INITIAL_APP_STATE } from 'src/app/types/app-state.types';
import { AppActionTypes } from '../app.actions';

export const setActiveMenuReducer = on(
  AppActionTypes.setActiveMenuAction,
  (_, action) => {
    if (!action.activeMenu) {
      throw new Error('No activeMenu in payload. Action: AppActionTypes.setActiveMenuAction');
    }

    return action.activeMenu;
  }
);

export const activeMenuReducers = createReducer(
  INITIAL_APP_STATE.activeMenu,
  setActiveMenuReducer,
)
