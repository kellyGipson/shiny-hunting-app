import { activeMenuActionsContainer } from "./activeMenu/activeMenu.actions";
import { addShinyFormOpenActionsContainer } from "./addShinyFormOpen/addShinyFormOpen.actions";
import { currentHuntsActionsContainer } from "./currentHunts/currentHunts.actions";
import { currentNewPageActionsContainer } from "./currentNewPage/currentNewPage.actions";
import { previousHuntsActionsContainer } from "./previousHunts/previousHunts.actions";
import { selectedHuntActionsContainer } from "./selectedHunts/selectedHunts.actions";

export const AppActionTypes = {
  ...activeMenuActionsContainer,
  ...addShinyFormOpenActionsContainer,
  ...currentNewPageActionsContainer,
  ...currentHuntsActionsContainer,
  ...previousHuntsActionsContainer,
  ...selectedHuntActionsContainer,
}
