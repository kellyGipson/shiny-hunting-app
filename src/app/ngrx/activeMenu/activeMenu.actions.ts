import { createAction, props } from "@ngrx/store"
import { activeMenuType } from "src/app/types/app.types"

export const activeMenuActionsType = {
  SET_ACTIVE_MENU_ACTION: 'SET_ACTIVE_MENU_ACTION',
}

export const setActiveMenuAction = createAction(
  activeMenuActionsType.SET_ACTIVE_MENU_ACTION,
  props<{ menu: activeMenuType }>(),
)

export const activeMenuActionsContainer = {
  setActiveMenuAction: setActiveMenuAction,
}
