import { createReducer, on } from "@ngrx/store";
import copy from "fast-copy";
import { deepEqual } from "fast-equals";
import { INITIAL_APP_STATE } from "src/app/types/app-state.types";
import { Hunt } from "src/app/types/Hunts.types";
import { AppActionTypes } from "../app.actions";
import { get } from "lodash";

export const setSelectedHuntsAction = on(
  AppActionTypes.setSelectedHuntAction,
  (_, action) => {
    if (action.list.length === 0 || !action.list) {
      throw new Error(`No selectedHunts in payload. In Action: ${action.type}`);
    }
    return action.list;
  }
);

export const addSelectedHuntsAction = on(
  AppActionTypes.addSelectedHuntAction,
  (state: Hunt[], action) => {
    let newSelectedHunts = copy(state);
    newSelectedHunts.push(action.hunt);

    return newSelectedHunts;
  }
);

export const updateSelectedHuntsAction = on(
  AppActionTypes.updateSelectedHuntAction,
  (state: Hunt[], action) => {
    let newState = copy(state);
    const index = newState.findIndex((hunt) => deepEqual(hunt.id, action.hunt.id));
    newState.splice(index, 1, action.hunt);
    return newState;
  }
);

export const deleteSelectedHuntsAction = on(
  AppActionTypes.deleteSelectedHuntAction,
  (state: Hunt[], action) => {
    let newSelectedHunts = copy(state);
    const index = newSelectedHunts.findIndex((hunt) => deepEqual(hunt.id, action.hunt.id));
    if (!index) {
      return state;
    }
    newSelectedHunts.splice(index, 1);
    return newSelectedHunts;
  }
);

export const clearSelectedHuntsReducer = on(
  AppActionTypes.clearSelectedHuntAction,
  (_) => {
    return null;
  }
);

export const toggleIsLeftAlignReducer = on(
  AppActionTypes.toggleSelectedHuntIsLeftAlignAction,
  (state: Hunt[], action) => {
    const newState = [ ...state ];
    const huntPredicate = (h: Hunt) => deepEqual(h.id, action.hunt.id);
    const huntIndex = newState.findIndex(huntPredicate);
    const hunt = get(newState, huntIndex);

    if (huntIndex === -1 || !hunt) {
      throw new Error(`Could not find a Hunt. In Action: ${action.type}`);
    }

    const newHunt: Hunt = { ...hunt };
    newHunt.isLeftAlign = !hunt.isLeftAlign;
    newState.splice(huntIndex, 1, newHunt);

    return newState;
  }
);

export const selectedHuntsReducers = createReducer(
  INITIAL_APP_STATE,
  clearSelectedHuntsReducer,
  addSelectedHuntsAction,
  updateSelectedHuntsAction,
  deleteSelectedHuntsAction,
  setSelectedHuntsAction,
  toggleIsLeftAlignReducer,
)
