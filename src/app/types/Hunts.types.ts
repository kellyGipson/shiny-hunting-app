import { Guid } from "guid-typescript";
import { methodsType } from "./pokemonFound.types";

export interface Hunt {
  id: Guid;
  species: string;
  huntStarted: Date;
  capturedOn: Date;
  count: number;
  foundOnGame: string;
  gameImgUrl: string;
  method: methodsType;
  pokemonImgUrl: string;
  interval: number;
  isLeftAlign?: boolean;
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
  isLeftAlign: false,
}
