import { activeMenuReducers } from "./activeMenu/activeMenu.reducers";
import { addShinyFormOpenReducers } from "./addShinyFormOpen/addShinyFormOpen.reducers";
import { currentHuntsReducers } from "./currentHunts/currentHunts.reducers";
import { currentNewPageReducers } from "./currentNewPage/currentNewPage.reducers";
import { previousHuntsReducers } from "./previousHunts/previousHunts.reducers";

export const AppReducers = {
  activeMenu: activeMenuReducers,
  addShinyFormOpen: addShinyFormOpenReducers,
  currentHunts: currentHuntsReducers,
  currentNewPage: currentNewPageReducers,
  previousHunts: previousHuntsReducers,
};
