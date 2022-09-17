import { methodsType } from "./pokemonFound.types";

export interface CurrentHunt {
  species: string | null;
  huntStarted: Date | null;
  capturedOn: Date | null;
  count: number | null;
  foundOnGame: string | null; // todo add games
  method: methodsType | null;
  pokemonImgUrl: string | null;
}

export type CurrentHuntsStateType = CurrentHunt[];
export type AddCurrentHunt = CurrentHunt & { index: number };
