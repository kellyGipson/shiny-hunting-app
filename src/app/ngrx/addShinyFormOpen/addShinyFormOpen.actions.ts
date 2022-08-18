import { createAction, props } from "@ngrx/store"

export const addShinyFormOpenActionsType = {
  TOGGLE_ADD_SHINY_FORM_OPEN_ACTION: 'TOGGLE_ADD_SHINY_FORM_OPEN_ACTION',
}

export const toggleAddShinyFormOpenAction = createAction(
  addShinyFormOpenActionsType.TOGGLE_ADD_SHINY_FORM_OPEN_ACTION,
)

export const addShinyFormOpenActionsContainer = {
  toggleAddShinyFormOpenAction: toggleAddShinyFormOpenAction,
}
