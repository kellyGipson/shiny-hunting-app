import { createAction, props } from "@ngrx/store"
import { Hunt } from "src/app/types/Hunts.types";

export const addCurrentHuntsAction = createAction(
  'ADD_CURRENT_HUNTS_OPEN_ACTION',
  props<{ hunt: Hunt }>(),
);

export const deleteCurrentHuntsAction = createAction(
  'DELETE_CURRENT_HUNTS_OPEN_ACTION',
  props<{ hunt: Hunt }>(),
);

export const updateCurrentHuntsAction = createAction(
  'UPDATE_CURRENT_HUNTS_OPEN_ACTION',
  props<{ hunt: Hunt }>(),
);

export const setCurrentHuntsAction = createAction(
  'SET_CURRENT_HUNTS_OPEN_ACTION',
  props<{ list: Hunt[] }>(),
);

export const currentHuntsActionsContainer = {
  addCurrentHuntsAction,
  deleteCurrentHuntsAction,
  updateCurrentHuntsAction,
  setCurrentHuntsAction,
}
