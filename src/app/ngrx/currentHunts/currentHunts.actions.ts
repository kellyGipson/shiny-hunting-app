import { createAction, props } from "@ngrx/store"
import { CurrentHunt } from "src/app/types/currentHunts.types";

export const currentHuntsActionsType = {
  ADD_CURRENT_HUNTS_OPEN_ACTION: 'ADD_CURRENT_HUNTS_OPEN_ACTION',
  DELETE_CURRENT_HUNTS_OPEN_ACTION: 'DELETE_CURRENT_HUNTS_OPEN_ACTION',
  UPDATE_CURRENT_HUNTS_OPEN_ACTION: 'UPDATE_CURRENT_HUNTS_OPEN_ACTION',
  SET_CURRENT_HUNTS_OPEN_ACTION: 'SET_CURRENT_HUNTS_OPEN_ACTION',
}

export const addCurrentHuntsAction = createAction(
  currentHuntsActionsType.ADD_CURRENT_HUNTS_OPEN_ACTION,
  props<CurrentHunt>()
);

export const deleteCurrentHuntsAction = createAction(
  currentHuntsActionsType.DELETE_CURRENT_HUNTS_OPEN_ACTION,
  props<CurrentHunt>(),
);

export const updateCurrentHuntsAction = createAction(
  currentHuntsActionsType.UPDATE_CURRENT_HUNTS_OPEN_ACTION,
  props<CurrentHunt>(),
);

export const setCurrentHuntsAction = createAction(
  currentHuntsActionsType.SET_CURRENT_HUNTS_OPEN_ACTION,
  props<{ list: CurrentHunt[] }>(),
);

export const currentHuntsActionsContainer = {
  addCurrentHuntsAction: addCurrentHuntsAction,
  deleteCurrentHuntsAction: deleteCurrentHuntsAction,
  updateCurrentHuntsAction: updateCurrentHuntsAction,
  setCurrentHuntsAction: setCurrentHuntsAction,
}
