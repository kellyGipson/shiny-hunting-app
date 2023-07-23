import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { PokemonClient } from "pokenode-ts";
import { Observable, take, tap } from "rxjs";
import { AppBusiness } from "src/app/business/app/app.business";
import { CurrentHuntsBusiness } from "src/app/business/currentHunts/currentHunts.business";
import { PreviousHuntsBusiness } from "src/app/business/previousHunts/previousHunts.business";
import { SelectedHuntsBusiness } from "src/app/business/selectedHunts/selectedHunts.business";
import { ActiveMenuEnum } from "src/app/types/activeMenu.types";
import { AppState } from "src/app/types/app-state.types";
import { Hunt } from "src/app/types/Hunts.types";

@Component({
  selector: 'app-selected-hunt',
  templateUrl: './selected-hunt.component.html',
  styleUrls: ['./selected-hunt.component.scss']
})
export class SelectedHuntComponent implements OnInit, OnDestroy {
  activeMenu: Observable<ActiveMenuEnum> = this._appBusiness.getActiveMenu$();
  selectedHunts$: Observable<Hunt[]>;

  pokemonApi = new PokemonClient();
  currentCount: number | null;
  countAnimation: boolean = false;
  isResetConfirmationOpen: boolean = false;
  editingCount: boolean = false;

  constructor(
    private readonly _appBusiness: AppBusiness,
    private readonly _store$: Store<AppState>,
    private readonly _selectedHuntBusiness: SelectedHuntsBusiness,
    private readonly _currentHuntsBusiness: CurrentHuntsBusiness,
    private readonly _previousHuntsBusiness: PreviousHuntsBusiness,
  ) {}

  async ngOnInit(): Promise<void> {
    this._mapState();
    document.addEventListener('keypress', e => this.onKeypress(e));
  }

  ngOnDestroy(): void {
    document.removeEventListener('keypress', e => this.onKeypress(e));
  }

  onIntervalIncrease(): void {
    const selectedHunts = this._selectedHuntBusiness.getSelectedHunts();
    if (!!selectedHunts) {
      this._currentHuntsBusiness.updateSelectedHunt({
        ...selectedHunts[0],
        interval: selectedHunts[0].interval + 1,
      });
      this._selectedHuntBusiness.setSelectedHunt({
        ...selectedHunts[0],
        interval: selectedHunts[0].interval + 1,
      });
    }
  }

  onIntervalDecrease(): void {
    const selectedHunt = this._selectedHuntBusiness.getSelectedHunts();
    if (!!selectedHunt) {
      if (selectedHunt[0].interval > 1 && selectedHunt[0].interval <= Number.MAX_SAFE_INTEGER) {
        this._currentHuntsBusiness.updateSelectedHunt({
          ...selectedHunt[0],
          interval: selectedHunt[0].interval - 1,
        });
        this._selectedHuntBusiness.setSelectedHunt({
          ...selectedHunt[0],
          interval: selectedHunt[0].interval - 1,
        });
      }
    }
  }

  onCounterIncrease(): void {
    this.counterAnimationFn();
    const selectedHunt = this._selectedHuntBusiness.getSelectedHunts();
    if (!!selectedHunt) {
      let newCount = selectedHunt[0].count + selectedHunt[0].interval;
      if (newCount > Number.MAX_SAFE_INTEGER) {
        newCount = Number.MAX_SAFE_INTEGER;
      }
      this._currentHuntsBusiness.updateSelectedHunt({
        ...selectedHunt[0],
        count: newCount,
      });
      this._selectedHuntBusiness.setSelectedHunt({
        ...selectedHunt[0],
        count: newCount,
      });
    }
  }

  onCounterDecrease(): void {
    if (this.editingCount) {
      return;
    }
    const selectedHunt = this._selectedHuntBusiness.getSelectedHunts();
    if (!!selectedHunt) {
      let newCount = selectedHunt[0].count - selectedHunt[0].interval;
      if (newCount < 0) {
        newCount = 0;
      }
      this._currentHuntsBusiness.updateSelectedHunt({
        ...selectedHunt[0],
        count: newCount,
      });
      this._selectedHuntBusiness.setSelectedHunt({
        ...selectedHunt[0],
        count: newCount,
      });
    }
  }

  counterAnimationFn(): void {
    this.countAnimation = true;
    setTimeout(() => this.countAnimation = false, 100);
  }

  foundAShiny() {
    let shiny: Hunt[];
    this.selectedHunts$.pipe(
      take(1),
      tap((hunts) => {
        shiny = hunts;
      })
    ).subscribe();
    shiny.forEach((hunt) => {
      this._previousHuntsBusiness.addPreviousHunt(hunt);
    })
    this._selectedHuntBusiness.setSelectedHunt(null);
    this._appBusiness.setActiveMenu(ActiveMenuEnum.Previous);
  }

  onResetCounter(): void {
    this.isResetConfirmationOpen = true;
  }

  onResetConfirm(): void {
    const selectedHunt = this._selectedHuntBusiness.getSelectedHunts();
    this._currentHuntsBusiness.updateSelectedHunt({
      ...selectedHunt[0],
      count: 0,
    });
    this._selectedHuntBusiness.setSelectedHunt({
      ...selectedHunt[0],
      count: 0,
    });
    this.isResetConfirmationOpen = false;
  }

  onResetCancel(): void {
    this.isResetConfirmationOpen = false;
  }

  onKeypress(e: any): void {
    if (this._appBusiness.getActiveMenu() === ActiveMenuEnum.Current) {
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

  private _mapState(): void {
    this.selectedHunts$ = this._store$.select((s) => s.selectedHunts)
  }

  listenToEditingCount(e: any): void {
    if (e.key === 'Enter') {
      this.confirmEditCount(e.target.value as string);
    }
  }

  private confirmEditCount(value: string): void {
    const parsedValue = parseInt(value);
    // ! come back and fix this
    const selectedHunt = this._selectedHuntBusiness.getSelectedHunts();
    if (!!selectedHunt) {
      this._currentHuntsBusiness.updateSelectedHunt({
        ...selectedHunt[0],
        count: parsedValue,
      });
      this._selectedHuntBusiness.setSelectedHunt({
        ...selectedHunt[0],
        count: parsedValue,
      });
    }
    this.editingCount = false;
  }
}
