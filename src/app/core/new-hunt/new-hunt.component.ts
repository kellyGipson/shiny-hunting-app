import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AppService } from 'src/app/services/app/app.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { activeMenuType } from 'src/app/types/app.types';
import { CurrentHunt } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-new-hunt',
  templateUrl: './new-hunt.component.html',
  styleUrls: ['./new-hunt.component.css', '../../app.component.css']
})
export class NewHuntComponent implements OnInit {
  readonly activeMenu: Observable<activeMenuType> = this._appService.getActiveMenu();
  readonly currentHunt: Observable<CurrentHunt> = this._pokemonService.getPokemonCurr();

  currentPage: Observable<'pokemon' | 'game' | 'method'> = this._appService.getCurrentNewPage();

  constructor(
    private readonly _appService: AppService,
    private readonly _pokemonService: PokemonService,
  ) {}

  async ngOnInit() {
  }
}
