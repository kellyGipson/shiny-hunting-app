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
import { PreviousHuntsBusiness } from 'src/app/business/previousHunts/previousHunts.business';

@Component({
  selector: 'app-prev-hunt',
  templateUrl: './prev-hunt.component.html',
  styleUrls: ['./prev-hunt.component.scss', '../../app.component.scss']
})
export class PokemonComponent implements OnInit {
  @Input() currentHunt!: CurrentHunt;

  activeMenu: Observable<ActiveMenuType>;
  addShinyOpen: Observable<boolean>;
  pokemonFound: Observable<PreviousHunts>;

  species: UntypedFormControl;
  count: UntypedFormControl;
  foundOnGame: pokemonGames;
  method: methodsType;

  allGames = allGames;
  allMethods = allMethods;
  isDeleteConfirmationOpen: boolean = false;
  selectedHunt: PreviousHunt

  constructor(
    private readonly _appBusiness: AppBusiness,
    private readonly _pokemonBusiness: PokemonBusiness,
    private readonly _previousHuntsBusiness: PreviousHuntsBusiness,
    private readonly _store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this._mapStore();
    this.species = new UntypedFormControl(this.currentHunt?.species || null);
    this.count = new UntypedFormControl(this.currentHunt?.count || null);
    this.foundOnGame = 'Gold';
    this.method = 'Full Odds';
  }

  onToggleShinyForm(): void {
    this._appBusiness.toggleAddShinyOpen();
  }

  async onShinySubmit(e: Event): Promise<void> {
    e?.preventDefault();
    await this._pokemonBusiness.getPokemonImgUrl(this.species?.value?.toLowerCase()).then((url) => {
      const newPokemonList: PreviousHunt = {
        id: Guid.create(),
        species: this.species.value,
        count: this.count.value,
        foundOnGame: this.foundOnGame,
        method: this.method,
        huntStarted: this.currentHunt?.huntStarted || new Date(),
        capturedOn: new Date(),
        pokemonImgUrl: url || '',
        interval: 1,
      };

      this._previousHuntsBusiness.addPreviousHunt(newPokemonList as CurrentHunt);
      this.resetFormData();
    })
  }

  onPokemonDelete(hunt: PreviousHunt): void {
    this.isDeleteConfirmationOpen = true;
    this.selectedHunt = hunt;
  }

  onDeleteConfirm(pokemon: PreviousHunt): void {
    this.isDeleteConfirmationOpen = false;
    this.selectedHunt = null;
    this._store$.dispatch(
      AppActionTypes.deletePreviousHuntsAction(pokemon)
    );
    this._pokemonBusiness.persistPokemonLists();
  }

  onDeleteCancel(): void {
    this.isDeleteConfirmationOpen = false;
    this.selectedHunt = null;
  }

  private _mapStore(): void {
    this.activeMenu = this._appBusiness.getActiveMenu$();
    this.addShinyOpen = this._appBusiness.getAddShinyOpen();
    this.pokemonFound = this._pokemonBusiness.getPokemonPrev();
  }

  private resetFormData(): void {
    this.species.setValue('');
    this.count.setValue(0);
    this.foundOnGame = 'Gold';
    this.method = 'Full Odds';
  }
}
