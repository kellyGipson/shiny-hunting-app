import { Injectable } from '@angular/core';

import { emptyPokemonData, PokemonDataStorage } from 'src/app/types/pokemonFound.types';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  getPokemonFoundFromLocal(): PokemonDataStorage {
    if(localStorage.getItem('found') !== null) {
      const rawData = localStorage.getItem('found');
      const pokemonData = JSON.parse(rawData!);
      return pokemonData as PokemonDataStorage;
    } else {
      this.setPokemonFoundToLocal(emptyPokemonData);
      return emptyPokemonData;
    }
  }

  setPokemonFoundToLocal(data: PokemonDataStorage): void {
    localStorage.setItem('found', JSON.stringify(data));
  }
}
