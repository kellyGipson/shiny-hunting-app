import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ActiveMenuEnum } from "src/app/types/activeMenu.types";
import { AppState } from "src/app/types/app-state.types";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  activeMenu: Observable<ActiveMenuEnum>;

  activeMenuEnum = ActiveMenuEnum;

  constructor(private readonly _store$: Store<AppState>) {}

  ngOnInit(): void {
    this.activeMenu = this._store$.select((s) => s.activeMenu);
  }
}
