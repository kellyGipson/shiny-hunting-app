import { createAction, props } from "@ngrx/store"
import { CurrentNewPageType } from "src/app/types/currentNewPage.types"

export const currentNewPageActionsType = {
  SET_CURRENT_NEW_PAGE_ACTION: 'SET_CURRENT_NEW_PAGE_ACTION',
  ADVANCE_CURRENT_NEW_PAGE_ACTION: 'ADVANCE_CURRENT_NEW_PAGE_ACTION',
  RECEDE_CURRENT_NEW_PAGE_ACTION: 'RECEDE_CURRENT_NEW_PAGE_ACTION',
}

export const setCurrentNewPageAction = createAction(
  currentNewPageActionsType.SET_CURRENT_NEW_PAGE_ACTION,
  props<{ currentNewPage: CurrentNewPageType }>(),
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
