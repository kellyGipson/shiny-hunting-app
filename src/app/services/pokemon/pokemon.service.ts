import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { IPokemonFoundList } from 'src/app/types/pokemonFound.types';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  readonly pokemonFoundSource = new BehaviorSubject<IPokemonFoundList>(this._storageService.getPokemonFoundFromLocal());
  readonly pokemonFound: Observable<IPokemonFoundList> = this.pokemonFoundSource.asObservable();

  constructor(
    private readonly _storageService: StorageService,
  ) { }

  getPokemonFound(): Observable<IPokemonFoundList> { return this.pokemonFound; }

  setPokemonFound(list: IPokemonFoundList): void {
    this.pokemonFoundSource.next(list);
    this._storageService.setPokemonFoundToLocal(list);
  }
}
