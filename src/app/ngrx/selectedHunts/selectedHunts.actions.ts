import { createAction, props } from "@ngrx/store"
import { Hunt } from "src/app/types/Hunts.types";

export const setSelectedHuntAction = createAction(
  'SET_SELECTED_HUNT_ACTION',
  props<{ list: Hunt[] }>(),
);

export const addSelectedHuntAction = createAction(
  'ADD_SELECTED_HUNT_ACTION',
  props<{ hunt: Hunt }>(),
);

export const updateSelectedHuntAction = createAction(
  'UPDATE_SELECTED_HUNT_ACTION',
  props<{ hunt: Hunt }>(),
);

export const deleteSelectedHuntAction = createAction(
  'DELETE_SELECTED_HUNT_ACTION',
  props<{ hunt: Hunt }>(),
);

export const clearSelectedHuntAction = createAction(
  'CLEAR_SELECTED_HUNT_ACTION',
);
);

export const selectedHuntActionsContainer = {
  clearSelectedHuntAction,
  addSelectedHuntAction,
  updateSelectedHuntAction,
  deleteSelectedHuntAction,
  setSelectedHuntAction,
}
