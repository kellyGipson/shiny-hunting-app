import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, map, Observable } from 'rxjs';
import { AppActionTypes } from 'src/app/ngrx/app.actions';
import { AppService } from 'src/app/services/app/app.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { AppState } from 'src/app/types/app-state.types';
import { allMethods, CurrentHunt, methodsType } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-method-select',
  templateUrl: './method-select.component.html',
  styleUrls: ['./method-select.component.css', '../../app.component.css']
})
export class MethodSelectComponent implements OnInit {

  currentHunt!: Observable<CurrentHunt>;
  currentHuntIndex!: number;

  methods: methodsType[] = allMethods;

  constructor(
    private readonly _pokemonService: PokemonService,
    private readonly _appService: AppService,
    private readonly _store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.currentHunt = this._store$.select((s) => {
      this.currentHuntIndex = s.currentHunts.length - 1;
      return s.currentHunts[s.currentHunts.length - 1];
    })
  }

  methodClick(method: methodsType) {
    this.currentHunt.pipe(
      take(1),
      map((s) => {
        this._store$.dispatch(
          AppActionTypes.updateCurrentHuntsAction({
            ...s,
            method: method,
            index: this.currentHuntIndex,
          })
        );
      })
    ).subscribe();
    this._appService.progressToNextPage();
    this._appService.setActiveMenu('Current');
  }

  backButton() {
    this._appService.goBackToLastPage();
  }
}
