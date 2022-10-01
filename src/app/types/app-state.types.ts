import { ActiveMenuType } from "./activeMenu.types";
import { CurrentNewPageType } from "./currentNewPage.types";
import { Hunt } from "./Hunts.types";

export interface AppState {
  activeMenu: ActiveMenuType;
  addShinyFormOpen: boolean;
  currentNewPage: CurrentNewPageType;
  currentHunts: Hunt[];
  previousHunts: Hunt[];
  selectedHunts: Hunt[];
}

export const INITIAL_APP_STATE: AppState = {
  activeMenu: 'Home',
  addShinyFormOpen: false,
  currentNewPage: 'pokemon',
  currentHunts: [],
  previousHunts: [],
  selectedHunts: null,
}
