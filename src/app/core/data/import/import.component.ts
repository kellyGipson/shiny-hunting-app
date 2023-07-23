import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { first } from 'lodash';
import { StorageBusiness } from "src/app/business/storage/storage.business";
import { AppActionTypes } from "src/app/ngrx/app.actions";
import { AppState } from "src/app/types/app-state.types";

@Component({
  selector: 'import-data',
  template: `
    <input
      #fileUpload
      [accept]="'.json'"
      type="file"
      (change)="onFileSelected($event)"
      [style.display]="'none'"
    >

    <button
      mat-flat-button
      color="primary"
      (click)="fileUpload.click()"
    >Import Hunts</button>
  `
})
export class ImportDataComponent {
  uploadFileName: string;
  uploadFileContent: string;

  constructor(private readonly _store$: Store<AppState>) {}

  async onFileSelected(event: Event) {
    const file: File = first((event.target as HTMLInputElement).files);
    this.uploadFileName = file.name;
    this.uploadFileContent = await file.text();
    const importedState = JSON.parse(this.uploadFileContent) as AppState;
    this._store$.dispatch(
      AppActionTypes.setActiveMenuAction({ activeMenu: importedState.activeMenu })
    );
    this._store$.dispatch(
      AppActionTypes.setAddShinyFormOpenAction({ addShinyFormOpen: importedState.addShinyFormOpen })
    );
    this._store$.dispatch(
      AppActionTypes.setCurrentHuntsAction({ list: importedState.currentHunts })
    );
    this._store$.dispatch(
      AppActionTypes.setCurrentNewPageAction({ currentNewPage: importedState.currentNewPage })
    );
    this._store$.dispatch(
      AppActionTypes.setPreviousHuntsAction({ list: importedState.previousHunts })
    );
    this._store$.dispatch(
      AppActionTypes.setSelectedHuntAction({ list: importedState.selectedHunts })
    );
    new StorageBusiness().setPokemonFoundToLocal(importedState);
  }
}
