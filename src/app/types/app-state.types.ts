import { ActiveMenuType } from "./activeMenu.types";
import { CurrentNewPageType } from "./currentNewPage.types";
import { CurrentHunt, emptyCurrentHunt } from "./currentHunts.types";
import { PreviousHunts } from "./previousHunts.types";

export interface AppState {
  activeMenu: ActiveMenuType;
  addShinyFormOpen: boolean;
  currentNewPage: CurrentNewPageType;
  currentHunts: CurrentHunt[];
  previousHunts: PreviousHunts;
  selectedHunt: CurrentHunt;
}

export const INITIAL_APP_STATE: AppState = {
  activeMenu: 'Home',
  addShinyFormOpen: false,
  currentNewPage: 'pokemon',
  currentHunts: [],
  previousHunts: [],
  selectedHunt: null,
}
