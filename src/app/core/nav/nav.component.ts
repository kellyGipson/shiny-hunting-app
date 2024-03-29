import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take, tap } from 'rxjs';

import { AppBusiness } from 'src/app/business/app/app.business';
import { AppState } from 'src/app/types/app-state.types';
import { ActiveMenuEnum, allActiveMenu } from 'src/app/types/activeMenu.types';
import { Hunt } from 'src/app/types/Hunts.types';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss', '../../app.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu$: Observable<ActiveMenuEnum>;

  menus: ActiveMenuEnum[] = allActiveMenu;
  activeMenuEnum = ActiveMenuEnum;
  selectedHunt: Hunt = null;
  menuOpen: boolean = false;

  constructor(
    private readonly _appBusiness: AppBusiness,
    private readonly _store$: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this._mapStore();
  }

  private _mapStore(): void {
    this.activeMenu$ = this._store$.select((s) => s.activeMenu);
  }

  onMenuClick(navItem: ActiveMenuEnum) {
    this._store$.pipe(
      take(1),
      tap((s) => {
        if(navItem !== s.activeMenu) {
          this._appBusiness.setActiveMenu(navItem);
        }
      })
    ).subscribe();
  }

  decideDisabled(navItem: ActiveMenuEnum) {
    let isDisabled: boolean = false;
    this._store$.pipe(
      take(1),
      tap((s) => {
        if (navItem === s.activeMenu) {
          isDisabled = true;
        }

        if (this.selectedHunt === null && navItem === ActiveMenuEnum.Current) {
          isDisabled = true;
        }
      })
    ).subscribe();
    return isDisabled;
  }
}
