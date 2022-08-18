import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokemonClient } from 'pokenode-ts';

import { map, Observable, take } from 'rxjs';
import { AppActionTypes } from 'src/app/ngrx/app.actions';

import { AppService } from 'src/app/services/app/app.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { AppState } from 'src/app/types/app-state.types';
import { activeMenuType } from 'src/app/types/app.types';
import { CurrentHunt, gameImgUrlLookup, PreviousHunt } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-current-hunt',
  templateUrl: './current-hunt.component.html',
  styleUrls: ['./current-hunt.component.css', '../../app.component.css']
})
export class CurrentHuntComponent implements OnInit, OnDestroy {
  pokemonApi = new PokemonClient();

  // State
  currentHunt!: Observable<CurrentHunt | null>;
  currentHuntIndex!: Observable<number | null>;
  activeMenu: Observable<activeMenuType> = this._appService.getActiveMenu();
  interval: number = 1;

  // Variables
  currentCount!: number | null;
  countAnimation: boolean = false;

  gameTyped!: keyof typeof gameImgUrlLookup;
  gameImgUrl!: string;

  constructor(
    private readonly _appService: AppService,
    private readonly _pokemonService: PokemonService,
    private readonly _store$: Store<AppState>,
  ) {}

  async ngOnInit(): Promise<void> {
    document.addEventListener('keypress', e => this.onKeypress(e));
    this.currentHunt = this._store$.select((s) => s.selectedHunt);
    this.currentHuntIndex = this._store$.select((s) => s.selectedHuntIndex);
    this.currentHunt.pipe(
      take(1),
      map((s) => {
        if (!!s?.foundOnGame) {
          this.gameTyped = s.foundOnGame.toLowerCase() as keyof typeof gameImgUrlLookup;
          this.gameImgUrl = gameImgUrlLookup[this.gameTyped];
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    document.removeEventListener('keypress', e => this.onKeypress(e));
  }

  onIntervalIncrease(): void {
    this.interval++;
  }

  onIntervalDecrease(): void {
    if (this.interval > 1 && this.interval <= Number.MAX_SAFE_INTEGER) {
        this.interval--;
    }
  }

  onCounterIncrease(): void {
    this.counterAnimationFn();
    this._store$.pipe(
      take(1),
      map((s) => {
        if (s?.selectedHunt?.count === null) {
          this._store$.dispatch(
            AppActionTypes.updateCurrentHuntsAction({
              ...s.selectedHunt,
              count: 0,
              index: s.selectedHuntIndex!,
            })
          );
        }
        const count = s.selectedHunt!.count! + this.interval;
        this._store$.dispatch(
          AppActionTypes.updateCurrentHuntsAction({
            ...s.selectedHunt!,
            count: count,
            index: s.selectedHuntIndex!,
          }),
        );
      })
    ).subscribe();
  }

  onCounterDecrease(): void {
    this._store$.pipe(
      take(1),
      map((s) => {
        if (s.selectedHunt!.count !== null) {
          if(!(s.selectedHunt!.count - this.interval < 0)) {
            this.counterAnimationFn();
            const count = s.selectedHunt!.count - this.interval;
            this._store$.dispatch(
              AppActionTypes.updateCurrentHuntsAction({
                ...s.selectedHunt!,
                count: count,
                index: s.selectedHuntIndex!,
              }),
            );
          }
        }
      })
    ).subscribe();
  }

  counterAnimationFn(): void {
    this.countAnimation = true;
    setTimeout(() => this.countAnimation = false, 100);
  }

  //{"currentHunt":{"species":"Totodile","huntStarted":"2022-07-06T01:50:32.175Z","capturedOn":null,"count":5451,"foundOnGame":"heartgold","method":"fullodds"},"previousHunts":[{"species":"chikorita","count":330,"foundOnGame":"heartgold","method":"fullodds","huntStarted":null,"capturedOn":"2022-07-06T01:50:26.041Z"},{"species":"psyduck","count":4302,"foundOnGame":"brilliantdiamond","method":"fullodds","huntStarted":null,"capturedOn":"2022-07-06T01:49:56.834Z"},{"species":"wooper","count":194,"foundOnGame":"brilliantdiamond","method":"fullodds","huntStarted":null,"capturedOn":"2022-07-06T01:49:41.399Z"},{"species":"bibarel","count":2222,"foundOnGame":"brilliantdiamond","method":"fullodds","huntStarted":null,"capturedOn":"2022-07-06T01:49:30.148Z"},{"species":"quagsire","count":964,"foundOnGame":"brilliantdiamond","method":"fullodds","huntStarted":"2022-07-06T01:47:51.845Z","capturedOn":"2022-07-06T01:49:12.681Z"}]}

  foundAShiny() {
    this._appService.setActiveMenu('Previous');
    this._appService.toggleAddShinyOpen();
    this._store$.pipe(
      take(1),
      map((s) => {
        this._store$.dispatch(
          AppActionTypes.addPreviousHuntsAction(s.selectedHunt as PreviousHunt)
        );
        this._store$.dispatch(
          AppActionTypes.deleteCurrentHuntsAction({ index: s.selectedHuntIndex! })
        );
      })
    )
  }

  onResetCounter(): void {
    if (window.confirm("Are you sure you want to reset the counter?")) {
      this._store$.pipe(
        take(1),
        map((s) => {
          this._store$.dispatch(
            AppActionTypes.updateCurrentHuntsAction({
              ...s.selectedHunt!,
              count: 0,
              index: s.selectedHuntIndex!,
            })
          );
        })
      ).subscribe();
    }
  }

  onKeypress(e: any): void {
    switch(e.key) {
      case  ' ':
        this.onCounterIncrease();
        return;
      case '0':
        this.onCounterDecrease();
        return;
      case '+':
        this.onIntervalIncrease();
        return;
      case '-':
        this.onIntervalDecrease();
        return;
    }
  }
}
