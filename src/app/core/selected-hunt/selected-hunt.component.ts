import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { PokemonClient } from "pokenode-ts";
import { map, Observable, take, tap } from "rxjs";
import { AppBusiness } from "src/app/business/app/app.business";
import { CurrentHuntsBusiness } from "src/app/business/currentHunts/currentHunts.business";
import { SelectedHuntBusiness } from "src/app/business/selectedHunt/selectedHunt.business";
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
  selectedHunt$: Observable<CurrentHunt>;

  pokemonApi = new PokemonClient();
  currentCount: number | null;
  countAnimation: boolean = false;
  gameTyped: keyof typeof gameImgUrlLookup;
  gameImgUrl: string;
  isResetConfirmationOpen: boolean = false;
  editingCount: boolean = false;

  constructor(
    private readonly _appBusiness: AppBusiness,
    private readonly _store$: Store<AppState>,
    private readonly _selectedHuntBusiness: SelectedHuntBusiness,
    private readonly _currentHuntsBusiness: CurrentHuntsBusiness,
  ) {}

  async ngOnInit(): Promise<void> {
    this._mapState();
    document.addEventListener('keypress', e => this.onKeypress(e));
    if (this.selectedHunt$ !== null && this.selectedHunt$ !== undefined) {
      this.selectedHunt$.pipe(
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
    const selectedHunt = this._selectedHuntBusiness.getSelectedHunt();
    if (!!selectedHunt) {
      this._currentHuntsBusiness.updateSelectedHunt({
        ...selectedHunt,
        interval: selectedHunt.interval + 1,
      });
      this._selectedHuntBusiness.setSelectedHunt({
        ...selectedHunt,
        interval: selectedHunt.interval + 1,
      });
    }
  }

  onIntervalDecrease(): void {
    const selectedHunt = this._selectedHuntBusiness.getSelectedHunt();
    if (!!selectedHunt) {
      if (selectedHunt.interval > 1 && selectedHunt.interval <= Number.MAX_SAFE_INTEGER) {
        this._currentHuntsBusiness.updateSelectedHunt({
          ...selectedHunt,
          interval: selectedHunt.interval - 1,
        });
        this._selectedHuntBusiness.setSelectedHunt({
          ...selectedHunt,
          interval: selectedHunt.interval - 1,
        });
      }
    }
  }

  onCounterIncrease(): void {
    this.counterAnimationFn();
    const selectedHunt = this._selectedHuntBusiness.getSelectedHunt();
    if (!!selectedHunt) {
      let newCount = selectedHunt.count + selectedHunt.interval;
      if (newCount > Number.MAX_SAFE_INTEGER) {
        newCount = Number.MAX_SAFE_INTEGER;
      }
      this._currentHuntsBusiness.updateSelectedHunt({
        ...selectedHunt,
        count: newCount,
      });
      this._selectedHuntBusiness.setSelectedHunt({
        ...selectedHunt,
        count: newCount,
      });
    }
  }

  onCounterDecrease(): void {
    if (this.editingCount) {
      return;
    }
    const selectedHunt = this._selectedHuntBusiness.getSelectedHunt();
    if (!!selectedHunt) {
      let newCount = selectedHunt.count - selectedHunt.interval;
      if (newCount < 0) {
        newCount = 0;
      }
      this._currentHuntsBusiness.updateSelectedHunt({
        ...selectedHunt,
        count: newCount,
      });
      this._selectedHuntBusiness.setSelectedHunt({
        ...selectedHunt,
        count: newCount,
      });
    }
  }

  counterAnimationFn(): void {
    this.countAnimation = true;
    setTimeout(() => this.countAnimation = false, 100);
  }

  foundAShiny() {}

  onResetCounter(): void {
    this.isResetConfirmationOpen = true;
  }

  onResetConfirm(): void {
    const selectedHunt = this._selectedHuntBusiness.getSelectedHunt();
    this._currentHuntsBusiness.updateSelectedHunt({
      ...selectedHunt,
      count: 0,
    });
    this._selectedHuntBusiness.setSelectedHunt({
      ...selectedHunt,
      count: 0,
    });
    this.isResetConfirmationOpen = false;
  }

  onResetCancel(): void {
    this.isResetConfirmationOpen = false;
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
    this.selectedHunt$ = this._store$.select((s) => s.selectedHunt)
  }

  listenToEditingCount(e: any): void {
    if (e.key === 'Enter') {
      this.confirmEditCount(e.target.value as string);
    }
  }

  private confirmEditCount(value: string): void {
    const parsedValue = parseInt(value);
    const selectedHunt = this._selectedHuntBusiness.getSelectedHunt();
    if (!!selectedHunt) {
      this._currentHuntsBusiness.updateSelectedHunt({
        ...selectedHunt,
        count: parsedValue,
      });
      this._selectedHuntBusiness.setSelectedHunt({
        ...selectedHunt,
        count: parsedValue,
      });
    }
    this.editingCount = false;
  }
}
