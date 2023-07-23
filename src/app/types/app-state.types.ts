import { ActiveMenuEnum } from "./activeMenu.types";
import { CurrentNewPageType } from "./currentNewPage.types";
import { Hunt } from "./Hunts.types";

export interface AppState {
  activeMenu: ActiveMenuEnum;
  addShinyFormOpen: boolean;
  currentNewPage: CurrentNewPageType;
  currentHunts: Hunt[];
  previousHunts: Hunt[];
  selectedHunts: Hunt[];
}

export const INITIAL_APP_STATE: AppState = {
  activeMenu: ActiveMenuEnum.Home,
  addShinyFormOpen: false,
  currentNewPage: 'pokemon',
  currentHunts: [],
  previousHunts: [],
  selectedHunts: null,
}
