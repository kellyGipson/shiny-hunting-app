import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AppService } from 'src/app/services/app/app.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { ActiveMenuType } from 'src/app/types/activeMenu.types';

@Component({
  selector: 'app-new-hunt',
  templateUrl: './new-hunt.component.html',
  styleUrls: ['./new-hunt.component.scss', '../../app.component.scss']
})
export class NewHuntComponent implements OnInit {
  readonly activeMenu: Observable<ActiveMenuType> = this._appService.getActiveMenu();

  currentPage: Observable<'pokemon' | 'game' | 'method'> = this._appService.getCurrentNewPage();

  constructor(
    private readonly _appService: AppService,
    private readonly _pokemonService: PokemonService,
  ) {}

  async ngOnInit() {
  }
}
