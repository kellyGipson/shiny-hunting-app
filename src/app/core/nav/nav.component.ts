import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { map, Observable, take } from 'rxjs';

import { AppService } from 'src/app/services/app/app.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { AppState } from 'src/app/types/app-state.types';
import { activeMenuType } from 'src/app/types/app.types';
import { CurrentHunt } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css', '../../app.component.css'],
})
export class NavComponent implements OnInit {
  activeMenu: Observable<activeMenuType> = this._appService.getActiveMenu();
  selectedHunt!: Observable<CurrentHunt | null>;

  menus: activeMenuType[] = ['Home', 'New', 'Current', 'Previous'];

  constructor(
    private readonly _appService: AppService,
    private readonly _pokemonService: PokemonService,
    private readonly _store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.selectedHunt = this._store.select((s) => s.selectedHunt);
  }

  onMenuClick(navItem: activeMenuType) {
    this.activeMenu.pipe(
      take(1),
      map((s) => {
        if(navItem !== s) {
          this._appService.setActiveMenu(navItem);
        }
      })
    )
  }

  decideDisabled(navItem: activeMenuType) {
    let isDisabled: boolean = false;
    this.selectedHunt.pipe(
      take(1),
      map((s) => {
        if(navItem === 'Current' && !!s && s.method === null) {
          isDisabled = true;
        }
      })
    ).subscribe();

    return isDisabled;
  }
}
