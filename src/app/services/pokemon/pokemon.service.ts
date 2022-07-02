import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { PokemonFoundList } from 'src/app/types/pokemonFound.types';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  readonly pokemonFoundSource = new BehaviorSubject<PokemonFoundList>(this._storageService.getPokemonFoundFromLocal());
  readonly pokemonFound: Observable<PokemonFoundList> = this.pokemonFoundSource.asObservable();

  constructor(
    private readonly _storageService: StorageService,
  ) { }

  getPokemonFound(): Observable<PokemonFoundList> { return this.pokemonFound; }

  setPokemonFound(list: PokemonFoundList): void {
    this.pokemonFoundSource.next(list);
    this._storageService.setPokemonFoundToLocal(list);
  }
}
