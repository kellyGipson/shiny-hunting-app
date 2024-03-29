import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppBusiness } from 'src/app/business/app/app.business';
import { ActiveMenuEnum } from 'src/app/types/activeMenu.types';
import { Hunt, emptyHunt } from 'src/app/types/Hunts.types';

@Component({
  selector: 'app-new-hunt',
  templateUrl: './new-hunt.component.html',
  styleUrls: ['./new-hunt.component.scss', '../../app.component.scss']
})
export class NewHuntComponent implements OnInit {
  newHuntToCreate: Hunt = emptyHunt;
  activeMenu: Observable<ActiveMenuEnum>;
  currentPage: Observable<'pokemon' | 'game' | 'method'>;

  constructor(
    private readonly _appBusiness: AppBusiness,
  ) {}

  async ngOnInit() {
    this._mapState();
  }

  private _mapState(): void {
    this.activeMenu = this._appBusiness.getActiveMenu$();
    this.currentPage = this._appBusiness.getCurrentNewPage$();
  }
}
