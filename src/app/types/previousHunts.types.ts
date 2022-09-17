import { methodsType } from "./pokemonFound.types";

export interface PreviousHunt {
  species: string | null;
  huntStarted: Date | null;
  capturedOn: Date | null;
  count: number | null;
  foundOnGame: string | null; // todo add games
  method: methodsType | null;
  pokemonImgUrl: string | null;
};

export type PreviousHunts = PreviousHunt[];
export type UpdatePreviousHunts = PreviousHunt & { index: number };
export type PreviousHuntsStateType = { previousHunts: PreviousHunts };
