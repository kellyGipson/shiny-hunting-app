import { Component, OnDestroy, OnInit } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Subject, takeUntil, tap } from "rxjs";
import { AppBusiness } from "./business/app/app.business";
import { StorageBusiness } from "./business/storage/storage.business";
import { AppState } from "./types/app-state.types";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  private _cancelListener = new Subject<void>();

  constructor(
    private readonly _store$: Store<AppState>,
    private readonly _actions$: Actions,
    private readonly _appBusiness: AppBusiness,
    private readonly _storageBusiness: StorageBusiness,
  ) {}

  ngOnInit(): void {
    this._storageBusiness.setPokemonFoundToLocal(
      this._storageBusiness.getPokemonFoundFromLocal()
    );
    this._listenToAllActionsAndPersistData();
    this._appBusiness.setAppState(this._storageBusiness.getPokemonFoundFromLocal());
  }

  ngOnDestroy(): void {
    this._cancelListener = null;
  }

  private _listenToAllActionsAndPersistData(): void {
    this._actions$.pipe(
      takeUntil(this._cancelListener),
      tap((_) => {
        this._storageBusiness.setPokemonFoundToLocal(this._appBusiness.getCurrentAppState());
      })
    ).subscribe();
  }
}
