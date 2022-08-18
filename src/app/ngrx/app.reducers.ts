import { setActiveMenuReducer } from "./activeMenu/activeMenu.reducers";
import { addShinyFormOpenReducer } from "./addShinyFormOpen/addShinyFormOpen.reducers";
import { currentHuntsReducer } from "./currentHunts/currentHunts.reducers";
import { currentNewPageReducer } from "./currentNewPage/currentNewPage.reducers";
import { previousHuntsReducer } from "./previousHunts/previousHunts.reducers";

export const AppReducers = {
  activeMenu: setActiveMenuReducer,
  addShinyFormOpen: addShinyFormOpenReducer,
  currentNewPage: currentNewPageReducer,
  currentHunts: currentHuntsReducer,
  previousHunts: previousHuntsReducer,
};
