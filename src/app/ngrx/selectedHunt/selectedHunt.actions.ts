import { createAction, props } from "@ngrx/store"
import { CurrentHunt } from "src/app/types/currentHunts.types";

export const selectedHuntActionsType = {
  SET_SELECTED_HUNT_OPEN_ACTION: 'SET_SELECTED_HUNT_OPEN_ACTION',
  CLEAR_SELECTED_HUNT_OPEN_ACTION: 'CLEAR_SELECTED_HUNT_OPEN_ACTION',
}

export const setSelectedHuntAction = createAction(
  selectedHuntActionsType.SET_SELECTED_HUNT_OPEN_ACTION,
  props<CurrentHunt>(),
);

export const clearSelectedHuntAction = createAction(
  selectedHuntActionsType.CLEAR_SELECTED_HUNT_OPEN_ACTION,
);

export const selectedHuntActionsContainer = {
  clearSelectedHuntAction: clearSelectedHuntAction,
  setSelectedHuntAction: setSelectedHuntAction,
}
