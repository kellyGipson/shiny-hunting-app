import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppActionTypes } from 'src/app/ngrx/app.actions';
import { AppBusiness } from 'src/app/business/app/app.business';
import { AppState } from 'src/app/types/app-state.types';
import { Hunt } from 'src/app/types/Hunts.types';
import { allMethods, methodsType } from 'src/app/types/pokemonFound.types';
import { Guid } from 'guid-typescript'
import { ActiveMenuEnum } from 'src/app/types/activeMenu.types';
import { PokemonBusiness } from 'src/app/business/pokemon/pokemon.business';

@Component({
  selector: 'app-method-select',
  templateUrl: './method-select.component.html',
  styleUrls: ['./method-select.component.scss', '../../../app.component.scss']
})
export class MethodSelectComponent implements OnInit {
  @Input()
  newHuntToCreate: Hunt;

  @Input()
  currentHunt!: Observable<Hunt>;
  @Input()
  currentHuntIndex!: number;

  methods: methodsType[] = allMethods;

  constructor(
    private readonly _appBusiness: AppBusiness,
    private readonly _pokemonBusiness: PokemonBusiness,
    private readonly _store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
  }

  methodClick(method: methodsType) {
    this.newHuntToCreate.method = method;
  }

  back() {
    this._appBusiness.goBackToLastPage();
  }

  next() {
    this._store$.dispatch(
      AppActionTypes.addCurrentHuntsAction({
        ...this.newHuntToCreate,
        gameImgUrl: this._pokemonBusiness.getGameImgUrl(this.newHuntToCreate),
        id: Guid.create(),
        count: 0,
        huntStarted: new Date(),
        capturedOn: null,
        interval: 1,
      })
    );
    this._appBusiness.progressToNextPage();
    this._appBusiness.setActiveMenu(ActiveMenuEnum.Home);
  }

  isNextDisabled(): boolean {
    return this.newHuntToCreate.method === null ||
      this.newHuntToCreate.foundOnGame === null ||
      this.newHuntToCreate.species === null;
  }
}
