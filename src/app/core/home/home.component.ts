import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/services/app/app.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { activeMenuType } from 'src/app/types/app.types';
import { CurrentHunt } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  readonly activeMenu: Observable<activeMenuType> = this._appService.getActiveMenu();

  currentPage: Observable<'pokemon' | 'game' | 'method'> = this._appService.getCurrentNewPage();

  constructor(
    private readonly _appService: AppService,
    private readonly _pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
  }

}
