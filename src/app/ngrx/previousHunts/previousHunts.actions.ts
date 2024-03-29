import { createAction, props } from "@ngrx/store"
import { Hunt } from "src/app/types/Hunts.types";

export const previousHuntsActionsType = {
  ADD_PREVIOUS_HUNTS_OPEN_ACTION: 'ADD_PREVIOUS_HUNTS_OPEN_ACTION',
  DELETE_PREVIOUS_HUNTS_OPEN_ACTION: 'DELETE_PREVIOUS_HUNTS_OPEN_ACTION',
  UPDATE_PREVIOUS_HUNTS_OPEN_ACTION: 'UPDATE_PREVIOUS_HUNTS_OPEN_ACTION',
  SET_PREVIOUS_HUNTS_OPEN_ACTION: 'SET_PREVIOUS_HUNTS_OPEN_ACTION',
}

export const addPreviousHuntsAction = createAction(
  previousHuntsActionsType.ADD_PREVIOUS_HUNTS_OPEN_ACTION,
  props<Hunt>(),
);

export const deletePreviousHuntsAction = createAction(
  previousHuntsActionsType.DELETE_PREVIOUS_HUNTS_OPEN_ACTION,
  props<Hunt>(),
);

export const updatePreviousHuntsAction = createAction(
  previousHuntsActionsType.UPDATE_PREVIOUS_HUNTS_OPEN_ACTION,
  props<Hunt>(),
);

export const setPreviousHuntsAction = createAction(
  previousHuntsActionsType.SET_PREVIOUS_HUNTS_OPEN_ACTION,
  props<{ list: Hunt[] }>(),
);

export const previousHuntsActionsContainer = {
  addPreviousHuntsAction: addPreviousHuntsAction,
  deletePreviousHuntsAction: deletePreviousHuntsAction,
  updatePreviousHuntsAction: updatePreviousHuntsAction,
  setPreviousHuntsAction: setPreviousHuntsAction,
}
