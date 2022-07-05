import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { allGames } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-game-select',
  templateUrl: './game-select.component.html',
  styleUrls: ['./game-select.component.css', '../../app.component.css']
})
export class GameSelectComponent implements OnInit {

  allGames: string[] = allGames;

  constructor(
    private readonly _pokemonService: PokemonService,
    private readonly _appService: AppService,
  ) { }

  ngOnInit(): void {
  }

  gameClick(game: string) {
    // update the current hunt
    this._pokemonService.setPokemonCurr({
      ...this._pokemonService.pokemonCurrSource.value,
      foundOnGame: game
    });
    // switch to game page
    this._appService.progressToNextPage();
  }

  backButton() {
    this._appService.goBackToLastPage();
  }
}
