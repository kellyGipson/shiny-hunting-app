import { Injectable } from '@angular/core';

import { IPokemonFound } from 'src/app/types/pokemonFound.types';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  getCountFromLocal(): number {
    if(localStorage.getItem("count") === null) {
      return 0;
    }
    //'+' casts the string to a number
    return +localStorage.getItem("count")!;
  }

  setCountToLocal(value: number) { localStorage.setItem("count", value.toString()); }

  getPokemonFoundFromLocal(): IPokemonFound[] {
    if(localStorage.getItem("found") === null) {
      return [];
    } else {
      const rawData = localStorage.getItem("found");
      return JSON.parse(rawData!);
    }
  }

  setPokemonFoundToLocal(value: IPokemonFound[]) { localStorage.setItem("found", JSON.stringify(value)); }
}