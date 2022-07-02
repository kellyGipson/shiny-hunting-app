import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AppService } from 'src/app/services/app/app.service';
import { activeMenuType } from 'src/app/types/app.types';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css', '../../app.component.css'],
})
export class NavComponent implements OnInit {
  activeMenu: Observable<activeMenuType> = this._appService.getActiveMenu();

  constructor(
    private readonly _appService: AppService,
  ) { }

  ngOnInit(): void {
  }

  onCurrMenuClick(): void {
    const curr = this._appService.activeMenuSource.value;
    if(curr === 'prev' || curr === 'new') {
      this._appService.setActiveMenu('curr');
    }
  }

  onPrevMenuClick(): void {
    const curr = this._appService.activeMenuSource.value;
    if(curr === 'curr' || curr === 'new') {
      this._appService.setActiveMenu('prev');
    }
  }

  onNewMenuClick(): void {
    const curr = this._appService.activeMenuSource.value;
    if(curr === 'prev' || curr === 'curr') {
      this._appService.setActiveMenu('new');
    }
  }
}
