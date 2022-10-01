import { Injectable } from '@angular/core';
import { AppState, INITIAL_APP_STATE } from 'src/app/types/app-state.types';

@Injectable({
  providedIn: 'root'
})
export class StorageBusiness {
  constructor() {}

  getPokemonFoundFromLocal(): AppState {
    const rawData = localStorage.getItem('state');
    return (JSON.parse(rawData) as AppState || INITIAL_APP_STATE);
  }

  setPokemonFoundToLocal(data: AppState): void {
    localStorage.setItem('state', JSON.stringify(data));
  }
}
