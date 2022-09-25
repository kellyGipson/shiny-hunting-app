import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppBusiness } from 'src/app/business/app/app.business';
import { CurrentHuntsBusiness } from 'src/app/business/currentHunts/currentHunts.business';
import { PokemonBusiness } from 'src/app/business/pokemon/pokemon.business';
import { ActiveMenuEnum, ActiveMenuType } from 'src/app/types/activeMenu.types';
import { CurrentHunt } from 'src/app/types/currentHunts.types';
import { CurrentNewPageType } from 'src/app/types/currentNewPage.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activeMenu: Observable<ActiveMenuType>;
  currentPage: Observable<CurrentNewPageType>;
  currentHunts: Observable<CurrentHunt[]>;

  constructor(
    private readonly _appBusiness: AppBusiness,
    private readonly _currentHuntsBusiness: CurrentHuntsBusiness,
  ) { }

  ngOnInit(): void {
    this._mapState();
  }

  private _mapState(): void {
    this.activeMenu = this._appBusiness.getActiveMenu$();
    this.currentPage = this._appBusiness.getCurrentNewPage$();
    this.currentHunts = this._currentHuntsBusiness.getCurrentHunts$();
  }

  onDeleteHunt(hunt): void {
    this._currentHuntsBusiness.deleteCurrentHunt(hunt);
  }

  addANewHunt(): void {
    this._appBusiness.setActiveMenu(ActiveMenuEnum.New);
  }
}
