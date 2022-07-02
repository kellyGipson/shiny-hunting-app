import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AppService } from 'src/app/services/app/app.service';
import { activeMenuType } from 'src/app/types/app.types';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css', '../../app.component.css']
})
export class NavComponent implements OnInit {
  activeMenu: Observable<activeMenuType> = this._appService.getActiveMenu();

  constructor(
    private readonly _appService: AppService,
  ) { }

  ngOnInit(): void {
  }

  onCounterClick(): void {
    if(this._appService.activeMenuSource.value === 'pokemon') {
      this._appService.setActiveMenu('counter');
    }
  }

  onPokemonClick(): void {
    if(this._appService.activeMenuSource.value === 'counter') {
      this._appService.setActiveMenu('pokemon');
    }
  }
}
