import { Component, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { Store } from "@ngrx/store";
import { PokemonClient } from "pokenode-ts";
import { Observable } from "rxjs";
import { AppBusiness } from "src/app/business/app/app.business";
import { CurrentHuntsBusiness } from "src/app/business/currentHunts/currentHunts.business";
import { PokemonBusiness } from "src/app/business/pokemon/pokemon.business";
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
  huntBeingEdited: Hunt = null;
  binomialDist: number;
  isShinyFoundOpen: boolean = false;
  showPhaseInputBox: boolean = false;
  phaseNameForm: UntypedFormControl;

  constructor(
    private readonly _appBusiness: AppBusiness,
    private readonly _store$: Store<AppState>,
    private readonly _selectedHuntBusiness: SelectedHuntsBusiness,
    private readonly _currentHuntsBusiness: CurrentHuntsBusiness,
    private readonly _previousHuntsBusiness: PreviousHuntsBusiness,
    private readonly _pokemonBusiness: PokemonBusiness,
  ) {}

  ngOnInit(): void {
    this._mapState();
    this.phaseNameForm = new UntypedFormControl(null);
    document.addEventListener('keypress', e => this.onKeypress(e));
  }

  ngOnDestroy(): void {
    document.removeEventListener('keypress', e => this.onKeypress(e));
  }

  onIntervalIncrease(hunt?: Hunt): void {
    if (!hunt) {
      const selectedHunts = this._selectedHuntBusiness.getSelectedHunts();
      selectedHunts?.forEach((selectedHunt) => {
        this._selectedHuntBusiness.updateSelectedHunt({
          ...selectedHunt,
          interval: selectedHunt.interval + 1,
        });
        this._currentHuntsBusiness.updateCurrentHunt({
          ...selectedHunt,
          interval: selectedHunt.interval + 1,
        });
      });
    } else {
      this._currentHuntsBusiness.updateCurrentHunt({
        ...hunt,
        interval: hunt.interval + 1,
      });
      this._selectedHuntBusiness.updateSelectedHunt({
        ...hunt,
        interval: hunt.interval + 1,
      });
    }
  }

  onIntervalDecrease(hunt?: Hunt): void {
    if (!hunt) {
      let selectedHunts = this._selectedHuntBusiness.getSelectedHunts();
      selectedHunts.forEach((selectedHunt) => {
        if (selectedHunt.interval > 1 && selectedHunt.interval <= Number.MAX_SAFE_INTEGER) {
          this._currentHuntsBusiness.updateCurrentHunt({
            ...selectedHunt,
            interval: selectedHunt.interval - 1,
          });
          this._selectedHuntBusiness.updateSelectedHunt({
            ...selectedHunt,
            interval: selectedHunt.interval - 1,
          });
        }
      })
    } else {
      if (hunt.interval > 1 && hunt.interval <= Number.MAX_SAFE_INTEGER) {
        this._currentHuntsBusiness.updateCurrentHunt({
          ...hunt,
          interval: hunt.interval - 1,
        });
        this._selectedHuntBusiness.updateSelectedHunt({
          ...hunt,
          interval: hunt.interval - 1,
        });
      }
    }
  }

  foundAShiny(hunt: Hunt) {
    if (!this.huntBeingEdited) { this.huntBeingEdited = hunt; }

    if (hunt.id === this.huntBeingEdited.id) {
      this.isShinyFoundOpen = !this.isShinyFoundOpen;
    }

    if (hunt.id !== this.huntBeingEdited.id && this.showPhaseInputBox) {
      this.showPhaseInputBox = false;
      this.isShinyFoundOpen = true;
    }
    this.huntBeingEdited = hunt;
  }

  onShinyPhase(hunt: Hunt) {

    this.isShinyFoundOpen = false;
    this.showPhaseInputBox = true;
  }

  onShinyTarget(hunt: Hunt, originalHunt?: Hunt) {
    if (!!originalHunt) {
      this._currentHuntsBusiness.addCurrentHunt({ ...originalHunt, count: 0 });
    }
    this._previousHuntsBusiness.addPreviousHunt(hunt);
    this._selectedHuntBusiness.deleteSelectedHunt(hunt);
    this._currentHuntsBusiness.deleteCurrentHunt(hunt);
    this._selectedHuntBusiness.setSelectedHunt(null);
    this._appBusiness.setActiveMenu(ActiveMenuEnum.Previous);
  }

  async onConfirmPhase(hunt: Hunt) {
    this._pokemonBusiness.getPokemonImgUrl(this.phaseNameForm.value.toLowerCase())
    .then((url) => {
      this.onShinyTarget(
        {
          ...hunt,
          species: this.phaseNameForm.value,
          pokemonImgUrl: url || '',
        },
        hunt
      );
      this.phaseNameForm.setValue(null);
    });
  }

  onCancelPhase() {
    this.showPhaseInputBox = false;
    this.phaseNameForm.setValue(null);
  }

  onResetCounter(): void {
    this.isResetConfirmationOpen = true;
  }

  onResetConfirm(): void {
    const selectedHunt = this._selectedHuntBusiness.getSelectedHunts();
    this._currentHuntsBusiness.updateCurrentHunt({
      ...selectedHunt[0],
      count: 0,
    });
    this._selectedHuntBusiness.updateSelectedHunt({
      ...selectedHunt[0],
      count: 0,
    });
    this.isResetConfirmationOpen = false;
  }

  onResetCancel(): void {
    this.isResetConfirmationOpen = false;
  }

  counterAnimationFn(): void {
    this.countAnimation = true;
    setTimeout(() => this.countAnimation = false, 100);
  }

  onKeypress(e: any): void {
    if (this._appBusiness.getActiveMenu() === ActiveMenuEnum.Current) {
      switch(e.key) {
        case '+':
          this.onIntervalIncrease();
          return;
        case '-':
          this.onIntervalDecrease();
          return;
      }
    }
  }

  listenToEditingCount(e: any): void {
    if (e.key === 'Enter') {
      this.confirmEditCount(e.target.value as string);
    }
  }

  onEditCount(hunt: Hunt): void {
    this.editingCount = true;
    this.huntBeingEdited = hunt;
  }

  private _mapState(): void {
    this.selectedHunts$ = this._store$.select((s) => s.selectedHunts);
  }

  private confirmEditCount(value: string): void {
    if (this.huntBeingEdited === null) { return; }

    const parsedValue = parseInt(value);

    this._currentHuntsBusiness.updateCurrentHunt({
      ...this.huntBeingEdited,
      count: parsedValue,
    });
    this._selectedHuntBusiness.updateSelectedHunt({
      ...this.huntBeingEdited,
      count: parsedValue,
    });

    this.editingCount = false;
    this.huntBeingEdited = null;
  }
}
