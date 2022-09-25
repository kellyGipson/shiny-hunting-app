import { methodsType } from "./pokemonFound.types";
import { Guid } from 'guid-typescript';

export interface PreviousHunt {
  id: Guid;
  species: string | null;
  huntStarted: Date | null;
  capturedOn: Date | null;
  count: number | null;
  foundOnGame: string | null; // todo add games
  method: methodsType | null;
  pokemonImgUrl: string | null;
  interval: number | null;
};

export type PreviousHunts = PreviousHunt[];
export type PreviousHuntsStateType = { previousHunts: PreviousHunts };
