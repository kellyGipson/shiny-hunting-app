import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AppBusiness } from 'src/app/business/app/app.business';
import { PokemonBusiness } from 'src/app/business/pokemon/pokemon.business';
import { ActiveMenuType } from 'src/app/types/activeMenu.types';
import { CurrentHunt, emptyCurrentHunt } from 'src/app/types/currentHunts.types';

@Component({
  selector: 'app-new-hunt',
  templateUrl: './new-hunt.component.html',
  styleUrls: ['./new-hunt.component.scss', '../../app.component.scss']
})
export class NewHuntComponent implements OnInit {
  newHuntToCreate: CurrentHunt = emptyCurrentHunt;
  activeMenu: Observable<ActiveMenuType>;
  currentPage: Observable<'pokemon' | 'game' | 'method'>;

  constructor(
    private readonly _appBusiness: AppBusiness,
    private readonly _pokemonBusiness: PokemonBusiness,
  ) {}

  async ngOnInit() {
    this._mapState();
  }

  private _mapState(): void {
    this.activeMenu = this._appBusiness.getActiveMenu$();
    this.currentPage = this._appBusiness.getCurrentNewPage$();
  }
}
