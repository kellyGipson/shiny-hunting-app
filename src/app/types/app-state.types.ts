import { activeMenuType, currentNewPageType } from "./app.types";
import { CurrentHunt, PreviousHunt } from "./pokemonFound.types";

export interface AppState {
  activeMenu: activeMenuType;
  addShinyFormOpen: boolean;
  currentNewPage: currentNewPageType;
  selectedHunt: CurrentHunt | null;
  selectedHuntIndex: number | null;
  currentHunts: CurrentHunt[];
  previousHunts: PreviousHunt[];
}

export const INITIAL_APP_STATE: AppState = {
  activeMenu: 'Home',
  addShinyFormOpen: false,
  currentNewPage: 'pokemon',
  selectedHunt: null,
  selectedHuntIndex: null,
  currentHunts: [],
  previousHunts: [],
}
