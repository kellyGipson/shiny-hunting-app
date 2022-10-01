import { Guid } from "guid-typescript";
import { methodsType } from "./pokemonFound.types";

export interface Hunt {
  id: Guid | null;
  species: string | null;
  huntStarted: Date | null;
  capturedOn: Date | null;
  count: number | null;
  foundOnGame: string | null;
  gameImgUrl: string | null;
  method: methodsType | null;
  pokemonImgUrl: string | null;
  interval: number | null;
}
export type HuntsStateType = Hunt[];

export const emptyHunt: Hunt = {
  id: null,
  species: null,
  huntStarted: null,
  capturedOn: null,
  count: null,
  foundOnGame: null,
  gameImgUrl: null,
  method: null,
  pokemonImgUrl: null,
  interval: null,
}
