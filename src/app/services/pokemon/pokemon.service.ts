import { Injectable } from '@angular/core';
import { PokemonClient } from 'pokenode-ts';

import { BehaviorSubject, Observable } from 'rxjs';

import { CurrentHunt, PreviousHunts } from 'src/app/types/pokemonFound.types';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemonApi = new PokemonClient();

  readonly pokemonPrevSource = new BehaviorSubject<PreviousHunts>(this._storageService.getPokemonFoundFromLocal().previousHunts);
  readonly pokemonPrev: Observable<PreviousHunts> = this.pokemonPrevSource.asObservable();

  readonly pokemonCurrSource = new BehaviorSubject<CurrentHunt>(this._storageService.getPokemonFoundFromLocal().currentHunt);
  readonly pokemonCurr: Observable<CurrentHunt> = this.pokemonCurrSource.asObservable();

  readonly currImgUrlSource = new BehaviorSubject<string>('');
  readonly currImgUrl: Observable<string> = this.currImgUrlSource.asObservable();

  constructor(
    private readonly _storageService: StorageService,
  ) {}

  getPokemonPrev(): Observable<PreviousHunts> {
    return this.pokemonPrev;
  }

  setPokemonPrev(list: PreviousHunts): void {
    this.pokemonPrevSource.next(list);
    this._storageService.setPokemonFoundToLocal({
      currentHunt: this.pokemonCurrSource.value,
      previousHunts: list
    });
  }

  getPokemonCurr(): Observable<CurrentHunt> {
    return this.pokemonCurr;
  }

  setPokemonCurr(list: CurrentHunt): void {
    this.pokemonCurrSource.next(list);
    this._storageService.setPokemonFoundToLocal({
      currentHunt: list,
      previousHunts: this.pokemonPrevSource.value
    });
  }

  getPokemonImgUrl(): Observable<string> {
    return this.currImgUrl;
  }

  async setPokemonImgUrl(pokemonName: string) {
    if(pokemonName !== '') {
      await this.pokemonApi.getPokemonByName(pokemonName).then(pokemon => this.currImgUrlSource.next(pokemon.sprites.front_shiny!))
    }
  }
}
