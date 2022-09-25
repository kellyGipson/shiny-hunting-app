import { Guid } from "guid-typescript";
import { methodsType } from "./pokemonFound.types";

export interface CurrentHunt {
  id: Guid | null;
  species: string | null;
  huntStarted: Date | null;
  capturedOn: Date | null;
  count: number | null;
  foundOnGame: string | null; // todo add games
  method: methodsType | null;
  pokemonImgUrl: string | null;
}
export type CurrentHuntsStateType = CurrentHunt[];

export const emptyCurrentHunt: CurrentHunt = {
  id: null,
  species: null,
  huntStarted: null,
  capturedOn: null,
  count: null,
  foundOnGame: null,
  method: null,
  pokemonImgUrl: null,
}
