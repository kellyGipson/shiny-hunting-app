import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { PokemonClient } from "pokenode-ts";
import { map, Observable, take } from "rxjs";
import { AppBusiness } from "src/app/business/app/app.business";
import { ActiveMenuType } from "src/app/types/activeMenu.types";
import { AppState } from "src/app/types/app-state.types";
import { CurrentHunt } from "src/app/types/currentHunts.types";
import { gameImgUrlLookup } from "src/app/types/pokemonFound.types";

@Component({
  selector: 'app-selected-hunt',
  templateUrl: './selected-hunt.component.html',
  styleUrls: ['./selected-hunt.component.scss']
})
export class SelectedHuntComponent implements OnInit, OnDestroy {
  activeMenu: Observable<ActiveMenuType> = this._appBusiness.getActiveMenu$();
  selectedHunt: Observable<CurrentHunt>;

  pokemonApi = new PokemonClient();
  interval: number = 1;
  currentCount!: number | null;
  countAnimation: boolean = false;
  gameTyped!: keyof typeof gameImgUrlLookup;
  gameImgUrl!: string;

  constructor(
    private readonly _appBusiness: AppBusiness,
    private readonly _store$: Store<AppState>,
  ) {}

  async ngOnInit(): Promise<void> {
    this._mapState();
    document.addEventListener('keypress', e => this.onKeypress(e));
    if (this.selectedHunt !== null && this.selectedHunt !== undefined) {
      this.selectedHunt.pipe(
        take(1),
        map((state) => {
          if (!!state?.foundOnGame) {
            this.gameTyped = state.foundOnGame.toLowerCase() as keyof typeof gameImgUrlLookup;
            this.gameImgUrl = gameImgUrlLookup[this.gameTyped];
          }
        })
      ).subscribe();
    }
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
  }

  onCounterDecrease(): void {
  }

  counterAnimationFn(): void {
    this.countAnimation = true;
    setTimeout(() => this.countAnimation = false, 100);
  }

  //{"currentHunt":{"species":"Totodile","huntStarted":"2022-07-06T01:50:32.175Z","capturedOn":null,"count":5451,"foundOnGame":"heartgold","method":"fullodds"},"previousHunts":[{"species":"chikorita","count":330,"foundOnGame":"heartgold","method":"fullodds","huntStarted":null,"capturedOn":"2022-07-06T01:50:26.041Z"},{"species":"psyduck","count":4302,"foundOnGame":"brilliantdiamond","method":"fullodds","huntStarted":null,"capturedOn":"2022-07-06T01:49:56.834Z"},{"species":"wooper","count":194,"foundOnGame":"brilliantdiamond","method":"fullodds","huntStarted":null,"capturedOn":"2022-07-06T01:49:41.399Z"},{"species":"bibarel","count":2222,"foundOnGame":"brilliantdiamond","method":"fullodds","huntStarted":null,"capturedOn":"2022-07-06T01:49:30.148Z"},{"species":"quagsire","count":964,"foundOnGame":"brilliantdiamond","method":"fullodds","huntStarted":"2022-07-06T01:47:51.845Z","capturedOn":"2022-07-06T01:49:12.681Z"}]}

  foundAShiny() {
    this._appBusiness.setActiveMenu('Previous');
    this._appBusiness.toggleAddShinyOpen();
    this._store$.pipe(
      take(1),
      map((s) => {
        // this._store$.dispatch(
        //   AppActionTypes.addPreviousHuntsAction(s.selectedHunt as PreviousHunt)
        // );
        // this._store$.dispatch(
        //   AppActionTypes.deleteCurrentHuntsAction({ index: s.selectedHuntIndex! })
        // );
      })
    )
  }

  onResetCounter(): void {
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

  private _mapState(): void {
    this.selectedHunt = this._store$.select((s) => s.selectedHunt)
  }
}
