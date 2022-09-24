import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, map, Observable } from 'rxjs';
import { AppActionTypes } from 'src/app/ngrx/app.actions';
import { AppService } from 'src/app/services/app/app.service';
import { AppState } from 'src/app/types/app-state.types';
import { CurrentHunt } from 'src/app/types/currentHunts.types';
import { allMethods, methodsType } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-method-select',
  templateUrl: './method-select.component.html',
  styleUrls: ['./method-select.component.scss', '../../app.component.scss']
})
export class MethodSelectComponent implements OnInit {
  currentHunt!: Observable<CurrentHunt>;
  currentHuntIndex!: number;

  methods: methodsType[] = allMethods;

  constructor(
    private readonly _appService: AppService,
    private readonly _store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.currentHunt = this._store$.select((s) => {
      this.currentHuntIndex = s.selectedHuntIndex;
      return s.currentHunts[s.selectedHuntIndex]
    });
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
    this._appService.setActiveMenu('Selected');
  }

  backButton() {
    this._appService.goBackToLastPage();
  }
}
