import { createAction, props } from "@ngrx/store"
import { create } from "domain"
import { currentNewPageType } from "src/app/types/app.types"

export const currentNewPageActionsType = {
  SET_CURRENT_NEW_PAGE_ACTION: 'SET_CURRENT_NEW_PAGE_ACTION',
  ADVANCE_CURRENT_NEW_PAGE_ACTION: 'ADVANCE_CURRENT_NEW_PAGE_ACTION',
  RECEDE_CURRENT_NEW_PAGE_ACTION: 'RECEDE_CURRENT_NEW_PAGE_ACTION',
}

export const setCurrentNewPageAction = createAction(
  currentNewPageActionsType.SET_CURRENT_NEW_PAGE_ACTION,
  props<{ currentNewPage: currentNewPageType }>(),
)

export const advanceCurrentNewPageAction = createAction(
  currentNewPageActionsType.ADVANCE_CURRENT_NEW_PAGE_ACTION
)

export const recedeCurrentNewPageAction = createAction(
  currentNewPageActionsType.RECEDE_CURRENT_NEW_PAGE_ACTION
)

export const currentNewPageActionsContainer = {
  advanceCurrentNewPageAction: advanceCurrentNewPageAction,
  recedeCurrentNewPageAction: recedeCurrentNewPageAction,
  setCurrentNewPageAction: setCurrentNewPageAction
}
