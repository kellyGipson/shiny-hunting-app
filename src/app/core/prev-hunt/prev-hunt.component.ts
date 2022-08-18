import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppActionTypes } from 'src/app/ngrx/app.actions';

import { AppService } from 'src/app/services/app/app.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { AppState } from 'src/app/types/app-state.types';
import { activeMenuType } from 'src/app/types/app.types';
import { CurrentHunt, PreviousHunt } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-prev-hunt',
  templateUrl: './prev-hunt.component.html',
  styleUrls: ['./prev-hunt.component.css', '../../app.component.css']
})
export class PokemonComponent implements OnInit {
  @Input() currentHunt!: CurrentHunt;

  activeMenu: Observable<activeMenuType> = this._appService.getActiveMenu();
  addShinyOpen: Observable<boolean> = this._appService.getAddShinyOpen();
  pokemonFound: Observable<PreviousHunt[]> = this._pokemonService.getPokemonPrev();

  species!: UntypedFormControl;
  count!: UntypedFormControl;
  foundOnGame!: UntypedFormControl;
  method!: UntypedFormControl;

  constructor(
    private readonly _appService: AppService,
    private readonly _pokemonService: PokemonService,
    private readonly _store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.species = new UntypedFormControl(this.currentHunt?.species || null);
    this.count = new UntypedFormControl(this.currentHunt?.count || null);
    this.foundOnGame = new UntypedFormControl(this.currentHunt?.foundOnGame || null);
    this.method = new UntypedFormControl(this.currentHunt?.method || null);
  }

  onToggleShinyForm(): void {
    this._appService.toggleAddShinyOpen();
  }

  onShinySubmit(e: Event): void {
    if(e)e.preventDefault();

    const newPokemonList: PreviousHunt[] = [
      {
        species: this.species.value,
        count: this.count.value,
        foundOnGame: this.foundOnGame.value,
        method: this.method.value,
        huntStarted: this.currentHunt.huntStarted,
        capturedOn: new Date(),
        pokemonImgUrl: null,
      },
    ];

    this._pokemonService.setPokemonPrev(newPokemonList);
    this.species.setValue("");
    this.count.setValue(0);
    this.foundOnGame.setValue("");
    this.method.setValue("");
  }

  onPokemonDelete(index: number): void {
    this._store$.dispatch(
      AppActionTypes.deletePreviousHuntsAction({ index: index })
    );
    this._pokemonService.persistPokemonLists();
  }
}
