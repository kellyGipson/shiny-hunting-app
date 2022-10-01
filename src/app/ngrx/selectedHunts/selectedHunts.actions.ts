import { createAction, props } from "@ngrx/store"
import { Hunt } from "src/app/types/Hunts.types";

export const selectedHuntActionsType = {
  SET_SELECTED_HUNT_ACTION: 'SET_SELECTED_HUNT_ACTION',
  ADD_SELECTED_HUNT_ACTION: 'ADD_SELECTED_HUNT_ACTION',
  UPDATE_SELECTED_HUNT_ACTION: 'UPDATE_SELECTED_HUNT_ACTION',
  DELETE_SELECTED_HUNT_ACTION: 'DELETE_SELECTED_HUNT_ACTION',
  CLEAR_SELECTED_HUNT_ACTION: 'CLEAR_SELECTED_HUNT_ACTION',
}

export const setSelectedHuntAction = createAction(
  selectedHuntActionsType.SET_SELECTED_HUNT_ACTION,
  props<{ list: Hunt[] }>(),
);

export const addSelectedHuntAction = createAction(
  selectedHuntActionsType.ADD_SELECTED_HUNT_ACTION,
  props<Hunt>(),
);

export const updateSelectedHuntAction = createAction(
  selectedHuntActionsType.UPDATE_SELECTED_HUNT_ACTION,
  props<Hunt>(),
);

export const deleteSelectedHuntAction = createAction(
  selectedHuntActionsType.DELETE_SELECTED_HUNT_ACTION,
  props<Hunt>(),
);

export const clearSelectedHuntAction = createAction(
  selectedHuntActionsType.CLEAR_SELECTED_HUNT_ACTION,
);

export const selectedHuntActionsContainer = {
  clearSelectedHuntAction,
  addSelectedHuntAction,
  updateSelectedHuntAction,
  deleteSelectedHuntAction,
  setSelectedHuntAction,
}
