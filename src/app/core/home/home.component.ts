import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppBusiness } from 'src/app/business/app/app.business';
import { PokemonBusiness } from 'src/app/business/pokemon/pokemon.business';
import { ActiveMenuType } from 'src/app/types/activeMenu.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly activeMenu: Observable<ActiveMenuType> = this._appBusiness.getActiveMenu();

  currentPage: Observable<'pokemon' | 'game' | 'method'> = this._appBusiness.getCurrentNewPage();

  constructor(
    private readonly _appBusiness: AppBusiness,
    private readonly _pokemonBusiness: PokemonBusiness,
  ) { }

  ngOnInit(): void {
  }

}
