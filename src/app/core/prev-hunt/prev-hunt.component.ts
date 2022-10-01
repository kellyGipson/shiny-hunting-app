import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppActionTypes } from 'src/app/ngrx/app.actions';
import { Guid } from 'guid-typescript';

import { AppBusiness } from 'src/app/business/app/app.business';
import { PokemonBusiness } from 'src/app/business/pokemon/pokemon.business';
import { AppState } from 'src/app/types/app-state.types';
import { ActiveMenuType } from 'src/app/types/activeMenu.types';
import { CurrentHunt } from 'src/app/types/currentHunts.types';
import { PreviousHunt, PreviousHunts } from 'src/app/types/previousHunts.types';
import { allGames, allMethods, methodsType, pokemonGames } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-prev-hunt',
  templateUrl: './prev-hunt.component.html',
  styleUrls: ['./prev-hunt.component.scss', '../../app.component.scss']
})
export class PokemonComponent implements OnInit {
  @Input() currentHunt!: CurrentHunt;

  activeMenu: Observable<ActiveMenuType> = this._appBusiness.getActiveMenu$();
  addShinyOpen: Observable<boolean> = this._appBusiness.getAddShinyOpen();
  pokemonFound: Observable<PreviousHunts> = this._pokemonBusiness.getPokemonPrev();

  species!: UntypedFormControl;
  count!: UntypedFormControl;
  foundOnGame!: pokemonGames;
  method!: methodsType;

  allGames = allGames;
  allMethods = allMethods;

  constructor(
    private readonly _appBusiness: AppBusiness,
    private readonly _pokemonBusiness: PokemonBusiness,
    private readonly _store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.species = new UntypedFormControl(this.currentHunt?.species || null);
    this.count = new UntypedFormControl(this.currentHunt?.count || null);
    this.foundOnGame = 'Gold';
    this.method = 'Full Odds';
  }

  onToggleShinyForm(): void {
    this._appBusiness.toggleAddShinyOpen();
  }

  onShinySubmit(e: Event): void {
    e?.preventDefault();
    const newPokemonList: PreviousHunts = [
      {
        id: Guid.create(),
        species: this.species.value,
        count: this.count.value,
        foundOnGame: this.foundOnGame,
        method: this.method,
        huntStarted: this.currentHunt?.huntStarted || new Date(),
        capturedOn: new Date(),
        pokemonImgUrl: null,
        interval: 1,
      },
    ];
    console.log(newPokemonList);

    this._pokemonBusiness.setPokemonPrev(newPokemonList);
    this.species.setValue('');
    this.count.setValue(0);
    this.foundOnGame = 'Gold';
    this.method = 'Full Odds';
  }

  onPokemonDelete(pokemon: PreviousHunt): void {
    this._store$.dispatch(
      AppActionTypes.deletePreviousHuntsAction(pokemon)
    );
    this._pokemonBusiness.persistPokemonLists();
  }
}
