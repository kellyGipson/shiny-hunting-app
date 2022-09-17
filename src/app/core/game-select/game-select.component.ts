import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { AppActionTypes } from 'src/app/ngrx/app.actions';
import { AppService } from 'src/app/services/app/app.service';
import { AppState } from 'src/app/types/app-state.types';
import { CurrentHunt } from 'src/app/types/currentHunts.types';
import { allGames, pokemonGames } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-game-select',
  templateUrl: './game-select.component.html',
  styleUrls: ['./game-select.component.css', '../../app.component.css']
})
export class GameSelectComponent implements OnInit {

  currentHunt!: Observable<CurrentHunt>;
  currentHuntIndex!: number;

  allGames: pokemonGames[] = allGames;

  constructor(
    private readonly _appService: AppService,
    private readonly _store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.currentHunt = this._store$.select((s) => {
      this.currentHuntIndex = s.selectedHuntIndex;
      return s.currentHunts[s.currentHunts.length - 1]
    });
  }

  gameClick(game: string) {
    this.currentHunt.pipe(
      take(1),
      map((s) => {
        this._store$.dispatch(
          AppActionTypes.updateCurrentHuntsAction({
            ...s,
            foundOnGame: game,
            index: this.currentHuntIndex
          })
        );
      })
    ).subscribe();
    this._appService.progressToNextPage();
  }

  backButton() {
    this._appService.goBackToLastPage();
  }
}
