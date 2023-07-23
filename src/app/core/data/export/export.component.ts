import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/types/app-state.types";
import { getOne } from "src/utils/observable/get-one";

@Component({
  selector: 'export-data',
  template: `
    <button
      mat-flat-button
      color="primary"
      (click)="onExport()"
    >Export Hunts</button>
  `
})
export class ExportDataComponent {
  constructor(private readonly _store$: Store<AppState>) {}

  onExport(): void {
    const fileName = `shiny-hunting-data-${new Date().toUTCString()}`;
    const fileContent = JSON.stringify(
      getOne(this._store$.select((s) => s))
    );

    const file = new Blob([fileContent], { type: 'application/json'});

    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    link.click();
    link.remove();
  }
}
