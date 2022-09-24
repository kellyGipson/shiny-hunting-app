import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take, tap } from 'rxjs';

import { AppService } from 'src/app/services/app/app.service';
import { AppState } from 'src/app/types/app-state.types';
import { ActiveMenuType, allActiveMenu } from 'src/app/types/activeMenu.types';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss', '../../app.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu$!: Observable<ActiveMenuType>;

  menus: ActiveMenuType[] = allActiveMenu;

  constructor(
    private readonly _appService: AppService,
    private readonly _store$: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this._mapStore();
  }

  private _mapStore(): void {
    this.activeMenu$ = this._store$.select((s) => s.activeMenu);
  }

  onMenuClick(navItem: ActiveMenuType) {
    this._store$.pipe(
      take(1),
      tap((s) => {
        if(navItem !== s.activeMenu) {
          this._appService.setActiveMenu(navItem);
        }
      })
    ).subscribe();
  }

  decideDisabled(navItem: ActiveMenuType) {
    let isDisabled: boolean = false;
    this._store$.pipe(
      take(1),
      tap((s) => {
        if (navItem === s.activeMenu) {
          isDisabled = true;
        }
      })
    ).subscribe();
    return isDisabled;
  }
}
