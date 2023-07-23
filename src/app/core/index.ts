import { GameSelectComponent } from "./new-hunt/game-select/game-select.component";
import { MethodSelectComponent } from "./new-hunt/method-select/method-select.component";
import { NavComponent } from "./nav/nav.component";
import { NewHuntComponent } from "./new-hunt/new-hunt.component";
import { PokemonSelectComponent } from "./new-hunt/pokemon-select/pokemon-select.component";
import { PokemonComponent } from "./prev-hunt/prev-hunt.component";
import { EditHuntComponent } from "./edit-hunt/edit-hunt.component";
import { DATA_COMPONENTS } from "./data";
import { SettingsComponent } from "./settings/settings.component";
import { SELECTED_HUNT_COMPONENTS } from "./selected-hunt";

export const APP_COMPONENTS = [
  NavComponent,
  PokemonComponent,
  NewHuntComponent,
  PokemonSelectComponent,
  GameSelectComponent,
  MethodSelectComponent,
  EditHuntComponent,
  SettingsComponent,
  SELECTED_HUNT_COMPONENTS,
  DATA_COMPONENTS,
];
