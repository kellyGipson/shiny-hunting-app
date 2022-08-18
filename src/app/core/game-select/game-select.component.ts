import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { AppActionTypes } from 'src/app/ngrx/app.actions';
import { AppService } from 'src/app/services/app/app.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { AppState } from 'src/app/types/app-state.types';
import { allGames, CurrentHunt, emptyPokemonData, pokemonGames } from 'src/app/types/pokemonFound.types';

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
    this.currentHunt = this._store$.select((s) => s.currentHunts[s.currentHunts.length - 1]);
    this._store$.pipe(
      take(1),
      map((s) => {
        this.currentHuntIndex = s.currentHunts.length - 1;
      })
    ).subscribe();
  }

  gameClick(game: string) {
    // update the current hunt
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
    // switch to game page
    this._appService.progressToNextPage();
  }

  backButton() {
    this._appService.goBackToLastPage();
  }
}
