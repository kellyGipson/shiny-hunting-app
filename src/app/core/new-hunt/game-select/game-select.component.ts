import { Component, Input } from '@angular/core';
import { AppBusiness } from 'src/app/business/app/app.business';
import { Hunt } from 'src/app/types/Hunts.types';
import { allGames, pokemonGames } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-game-select',
  templateUrl: './game-select.component.html',
  styleUrls: ['./game-select.component.scss', '../../../app.component.scss']
})
export class GameSelectComponent {
  @Input()
  newHuntToCreate: Hunt;

  allGames: pokemonGames[] = allGames;

  constructor(
    private readonly _appBusiness: AppBusiness,
  ) {}

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
