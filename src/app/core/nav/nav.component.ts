import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AppService } from 'src/app/services/app/app.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { activeMenuType } from 'src/app/types/app.types';
import { CurrentHunt } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css', '../../app.component.css'],
})
export class NavComponent implements OnInit {
  activeMenu: Observable<activeMenuType> = this._appService.getActiveMenu();
  currentHunt: Observable<CurrentHunt> = this._pokemonService.getPokemonCurr();

  menus: activeMenuType[] = ['New', 'Current', 'Previous'];

  constructor(
    private readonly _appService: AppService,
    private readonly _pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
  }

  onMenuClick(navItem: activeMenuType) {
    if(navItem !== this._appService.activeMenuSource.value) {
      this._appService.setActiveMenu(navItem);
    }
  }

  decideDisabled(navItem: activeMenuType) {
    if(navItem === 'Current' && this._pokemonService.pokemonCurrSource.value.method === null) {
      return true;
    }
    return false;
  }
}
