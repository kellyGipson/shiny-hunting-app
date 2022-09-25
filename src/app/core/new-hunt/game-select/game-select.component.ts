import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { AppActionTypes } from 'src/app/ngrx/app.actions';
import { AppBusiness } from 'src/app/business/app/app.business';
import { AppState } from 'src/app/types/app-state.types';
import { CurrentHunt } from 'src/app/types/currentHunts.types';
import { allGames, pokemonGames } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-game-select',
  templateUrl: './game-select.component.html',
  styleUrls: ['./game-select.component.scss', '../../../app.component.scss']
})
export class GameSelectComponent implements OnInit {
  @Input()
  newHuntToCreate: CurrentHunt;

  currentHunt!: Observable<CurrentHunt>;
  currentHuntIndex!: number;

  allGames: pokemonGames[] = allGames;

  constructor(
    private readonly _appBusiness: AppBusiness,
    private readonly _store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.currentHunt = this._store$.select((s) => {
      // this.currentHuntIndex = s.selectedHuntIndex;
      return s.currentHunts[s.currentHunts.length - 1]
    });
  }

  gameClick(game: string) {
    this.newHuntToCreate.foundOnGame = game;
  }

  back() {
    this._appBusiness.goBackToLastPage();
  }

  next() {
    this._appBusiness.progressToNextPage();
  }

  isNextDisabled(): boolean {
    return this.newHuntToCreate.foundOnGame === null ||
      this.newHuntToCreate.species === null;
  }
}
