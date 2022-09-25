import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppBusiness } from 'src/app/business/app/app.business';
import { CurrentHuntsBusiness } from 'src/app/business/currentHunts/currentHunts.business';
import { AppActionTypes } from 'src/app/ngrx/app.actions';
import { ActiveMenuEnum, ActiveMenuType } from 'src/app/types/activeMenu.types';
import { AppState } from 'src/app/types/app-state.types';
import { CurrentHunt } from 'src/app/types/currentHunts.types';
import { CurrentNewPageType } from 'src/app/types/currentNewPage.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activeMenu: Observable<ActiveMenuType>;
  currentPage: Observable<CurrentNewPageType>;
  currentHunts: Observable<CurrentHunt[]>;

  huntSelected: boolean = false;
  huntBeingEdited: boolean = false;
  selectedHunt: CurrentHunt = null;
  isDeleteConfirmationOpen: boolean = false;

  constructor(
    private readonly _appBusiness: AppBusiness,
    private readonly _currentHuntsBusiness: CurrentHuntsBusiness,
    private readonly _store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this._mapState();
  }

  private _mapState(): void {
    this.activeMenu = this._appBusiness.getActiveMenu$();
    this.currentPage = this._appBusiness.getCurrentNewPage$();
    this.currentHunts = this._currentHuntsBusiness.getCurrentHunts$();
  }

  confirmDelete(hunt: CurrentHunt): void {
    console.log(hunt.species);
    this.selectedHunt = hunt;
    this.isDeleteConfirmationOpen = true;
  }

  cancelDeleteConfirmation(): void {
    this.selectedHunt = null;
    this.isDeleteConfirmationOpen = false;
  }

  onDeleteHunt(): void {
    if (this.selectedHunt !== null) {
      this._currentHuntsBusiness.deleteCurrentHunt(this.selectedHunt);
    }
  }

  onEditHunt(hunt: CurrentHunt) {

  }

  onSelectHunt(hunt: CurrentHunt) {
    this._store$.dispatch(
      AppActionTypes.setSelectedHuntAction(hunt)
    );
    this._appBusiness.setActiveMenu(ActiveMenuEnum.Current);
  }

  addANewHunt(): void {
    this._appBusiness.setActiveMenu(ActiveMenuEnum.New);
  }
}
