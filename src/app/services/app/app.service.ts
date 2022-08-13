import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { emptyPokemonData, PokemonDataStorage } from 'src/app/types/pokemonFound.types';

import { activeMenuType } from '../../types/app.types';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly activeMenuSource = new BehaviorSubject<activeMenuType>('Home');
  readonly activeMenu: Observable<activeMenuType> = this.activeMenuSource.asObservable();

  readonly addShinyOpenSource = new BehaviorSubject<boolean>(false);
  readonly addShinyOpen: Observable<boolean> = this.addShinyOpenSource.asObservable();

  currentNewPageSource = new BehaviorSubject<'pokemon' | 'game' | 'method'>('pokemon');
  currentNewPage: Observable<'pokemon' | 'game' | 'method'> = this.currentNewPageSource;

  constructor(
    private readonly _storageService: StorageService,
  ) {}

  initApp(): void {
    try {
      const initData: PokemonDataStorage = this._storageService.getPokemonFoundFromLocal()
      if(initData.currentHunt.method === null) {
        this.activeMenuSource.next('New');
      }
    } catch (error) {
      this._storageService.setPokemonFoundToLocal(emptyPokemonData);
      this.activeMenuSource.next('New');
    }
  }

  getActiveMenu(): Observable<activeMenuType> {
    return this.activeMenu;
  }

  setActiveMenu(menu: activeMenuType): void {
    this.activeMenuSource.next(menu);
  }

  /**
   * @returns True if the shiny form is open
   */
  getAddShinyOpen(): Observable<boolean> {
    return this.addShinyOpen;
  }

  /**
   * Toggles the shiny form
   */
  toggleAddShinyOpen(): void {
    this.addShinyOpenSource.next(!this.addShinyOpenSource.value);
  }

  getCurrentNewPage(): Observable<'pokemon' | 'game' | 'method'> {
    return this.currentNewPage;
  }

  progressToNextPage(): void {
    switch(this.currentNewPageSource.value) {
      case 'pokemon':
        this.currentNewPageSource.next('game');
        break;
      case 'game':
        this.currentNewPageSource.next('method');
        break;
      case 'method':
        this.currentNewPageSource.next('pokemon');
        break;
    }
  }

  goBackToLastPage(): void {
    switch(this.currentNewPageSource.value) {
      case 'pokemon':
        break;
      case 'game':
        this.currentNewPageSource.next('pokemon');
        break;
      case 'method':
        this.currentNewPageSource.next('game');
        break;
    }
  }
}
