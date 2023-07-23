import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppActionTypes } from "src/app/ngrx/app.actions";
import { Hunt } from "src/app/types/Hunts.types";
import { AppState } from "src/app/types/app-state.types";

@Component({
  selector: 'selected-hunt-menu',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon>more_horizontal</mat-icon>
    </button>
    <mat-menu #menu="matMenu" panelClass="menu__panel">
      <button
        class="menu__btn"
        mat-menu-item
        color="primary"
        (click)="onToggleLeftAlign()"
      >
        <div>Toggle Left Align</div>
        <mat-checkbox [checked]="isLeftAlign"></mat-checkbox>
      </button>
    </mat-menu>
  `,
  styleUrls: ['./menu.component.scss'],
})
export class SelectedHuntMenuComponent {
  @Input() isLeftAlign: boolean;
  @Input() hunt: Hunt;

  constructor(private readonly _store$: Store<AppState>) {}

  onToggleLeftAlign(): void {
    this._store$.dispatch(
      AppActionTypes.toggleSelectedHuntIsLeftAlignAction({ hunt: this.hunt })
    );
  }
}
