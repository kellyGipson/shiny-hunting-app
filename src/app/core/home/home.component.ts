import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppBusiness } from 'src/app/business/app/app.business';
import { CurrentHuntsBusiness } from 'src/app/business/currentHunts/currentHunts.business';
import { AppActionTypes } from 'src/app/ngrx/app.actions';
import { ActiveMenuEnum } from 'src/app/types/activeMenu.types';
import { AppState } from 'src/app/types/app-state.types';
import { Hunt } from 'src/app/types/Hunts.types';
import { CurrentNewPageType } from 'src/app/types/currentNewPage.types';
import { SelectedHuntsBusiness } from 'src/app/business/selectedHunts/selectedHunts.business';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activeMenu: Observable<ActiveMenuEnum>;
  currentPage: Observable<CurrentNewPageType>;
  currentHunts: Observable<Hunt[]>;

  huntSelected: boolean = false;
  huntBeingEdited: boolean = false;
  selectedHunt: Hunt = null;
  isDeleteConfirmationOpen: boolean = false;
  userSelectingMultiple: boolean = false;
  userSelectedHunts: Hunt[] = [];

  constructor(
    private readonly _appBusiness: AppBusiness,
    private readonly _currentHuntsBusiness: CurrentHuntsBusiness,
    private readonly _selectedHuntsBusiness: SelectedHuntsBusiness,
    private readonly _store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this._mapState();
  }

  private _mapState(): void {
    this.activeMenu = this._appBusiness.getActiveMenu$();
    this.currentPage = this._appBusiness.getCurrentNewPage$();
    this.currentHunts = this._currentHuntsBusiness
      .getCurrentHunts$().pipe(map((hunts) => hunts.slice().reverse()));
  }

  confirmDelete(hunt: Hunt): void {
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

  onEditHunt(hunt: Hunt): void {

  }

  onSelectHunt(hunt: Hunt): void {
    if (this.userSelectingMultiple) {
      this.onToggleSelected(hunt);
      return;
    }
    this._store$.dispatch(
      AppActionTypes.setSelectedHuntAction({ list: [hunt]} )
    );
    this._appBusiness.setActiveMenu(ActiveMenuEnum.Current);
  }

  addANewHunt(): void {
    this._appBusiness.setActiveMenu(ActiveMenuEnum.New);
  }

  onToggleSelected(hunt: Hunt): void {
    if (this.huntExists(hunt).exists) {
      this.userSelectedHunts.splice(this.huntExists(hunt).index, 1);
    } else {
      this.userSelectedHunts.push(hunt);
    }
  }

  huntExists(hunt: Hunt): { exists: boolean, index: number } {
    const index = this.userSelectedHunts.findIndex((selectedHunt) =>
      selectedHunt.id === hunt.id);
    return {
      exists: index !== -1,
      index
    }
  }

  confirmSelectedHunts(): void {
    this._store$.dispatch(
      AppActionTypes.setSelectedHuntAction({ list: this.userSelectedHunts })
    );
    this._store$.dispatch(
      AppActionTypes.setActiveMenuAction({ activeMenu: ActiveMenuEnum.Current })
    );
    this.userSelectedHunts = [];
    this.userSelectingMultiple = false;
  }
}
