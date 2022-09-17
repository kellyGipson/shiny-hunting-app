import { createAction, props } from '@ngrx/store';
import { ActiveMenuStateType } from 'src/app/types/activeMenu.types';

export const activeMenuActionsType = {
  SET_ACTIVE_MENU_ACTION: 'SET_ACTIVE_MENU_ACTION',
}

export const setActiveMenuAction = createAction(
  activeMenuActionsType.SET_ACTIVE_MENU_ACTION,
  props<ActiveMenuStateType>(),
)

export const activeMenuActionsContainer = {
  setActiveMenuAction: setActiveMenuAction,
}
