import { createAction, props } from "@ngrx/store"
import { AddShinyFormOpenType } from "src/app/types/addShinyFormOpen.types"

export const addShinyFormOpenActionsType = {
  SET_ADD_SHINY_FORM_OPEN_ACTION: 'SET_ADD_SHINY_FORM_OPEN_ACTION',
  TOGGLE_ADD_SHINY_FORM_OPEN_ACTION: 'TOGGLE_ADD_SHINY_FORM_OPEN_ACTION',
}

export const toggleAddShinyFormOpenAction = createAction(
  addShinyFormOpenActionsType.TOGGLE_ADD_SHINY_FORM_OPEN_ACTION,
)

export const setAddShinyFormOpenAction = createAction(
  addShinyFormOpenActionsType.SET_ADD_SHINY_FORM_OPEN_ACTION,
  props<AddShinyFormOpenType>()
)

export const addShinyFormOpenActionsContainer = {
  toggleAddShinyFormOpenAction: toggleAddShinyFormOpenAction,
  setAddShinyFormOpenAction: setAddShinyFormOpenAction,
}
