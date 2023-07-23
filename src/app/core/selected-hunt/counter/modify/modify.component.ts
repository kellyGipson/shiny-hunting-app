import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { AppBusiness } from "src/app/business/app/app.business";
import { CurrentHuntsBusiness } from "src/app/business/currentHunts/currentHunts.business";
import { SelectedHuntsBusiness } from "src/app/business/selectedHunts/selectedHunts.business";
import { ActiveMenuEnum } from "src/app/types/activeMenu.types";

@Component({
  selector: 'selected-hunt-counter-modify',
  template: `
    <div class="counterButtons">
      <button class="counterButtons__btn counterButtons__decrease" (click)="onCounterDecrease()">-</button>
      <button class="counterButtons__btn counterButtons__increase" (click)="onCounterIncrease()">+</button>
    </div>
  `,
  styleUrls: ['./modify.component.scss'],
})
export class SelectedHuntCounterModifyComponent implements OnInit, OnDestroy {
  @Input() editingCount: boolean;

  @Output() countChanged = new EventEmitter<void>();

  keyPressCallback = (e: KeyboardEvent) => this.onKeypress(e);

  constructor(
    private readonly _selectedHuntBusiness: SelectedHuntsBusiness,
    private readonly _currentHuntsBusiness: CurrentHuntsBusiness,
    private readonly _appBusiness: AppBusiness,
  ) {}

  ngOnInit(): void {
    document.addEventListener('keypress', this.keyPressCallback);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keypress', this.keyPressCallback);
  }

  onKeypress(e: KeyboardEvent): void {
    if (this._appBusiness.getActiveMenu() === ActiveMenuEnum.Current) {
      if (e.key === ' ') {
        this.onCounterIncrease();
      }
      if (e.key === '0') {
        this.onCounterDecrease();
      }
    }
  }

  onCounterIncrease(): void {
    this.countChanged.emit();
    const selectedHunts = this._selectedHuntBusiness.getSelectedHunts();
    selectedHunts.forEach((selectedHunt) => {
      let newCount = selectedHunt.count + selectedHunt.interval;
      if (newCount > Number.MAX_SAFE_INTEGER) {
        newCount = Number.MAX_SAFE_INTEGER;
      }
      this._currentHuntsBusiness.updateCurrentHunt({
        ...selectedHunt,
        count: newCount,
      });
      this._selectedHuntBusiness.updateSelectedHunt({
        ...selectedHunt,
        count: newCount,
      });
    });
  }

  onCounterDecrease(): void {
    if (this.editingCount) {
      return;
    }
    const selectedHunts = this._selectedHuntBusiness.getSelectedHunts();
    selectedHunts.forEach((selectedHunt) => {
      let newCount = selectedHunt.count - selectedHunt.interval;
      if (newCount < 0) {
        newCount = 0;
      }
      this._currentHuntsBusiness.updateCurrentHunt({
        ...selectedHunt,
        count: newCount,
      });
      this._selectedHuntBusiness.updateSelectedHunt({
        ...selectedHunt,
        count: newCount,
      });
    })
  }
}
