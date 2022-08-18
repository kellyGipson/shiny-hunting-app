import { createAction, props } from "@ngrx/store"

export const selectedHuntActionsType = {
  SET_SELECTED_HUNT_OPEN_ACTION: 'SET_SELECTED_HUNT_OPEN_ACTION',
}

export const setSelectedHuntAction = createAction(
  selectedHuntActionsType.SET_SELECTED_HUNT_OPEN_ACTION,
  props<{ index: number }>(),
);

export const selectedHuntsActionsContainer = {
  setSelectedHuntAction: setSelectedHuntAction,
}
