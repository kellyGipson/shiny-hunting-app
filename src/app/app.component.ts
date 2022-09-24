import { Component, OnDestroy, OnInit } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Subject, takeUntil, tap } from "rxjs";
import { AppService } from "./services/app/app.service";
import { StorageService } from "./services/storage/storage.service";
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
    private readonly _appService: AppService,
    private readonly _storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this._storageService.setPokemonFoundToLocal(
      this._storageService.getPokemonFoundFromLocal()
    );
    this._listenToAllActionsAndPersistData();
    this._appService.setAppState(this._storageService.getPokemonFoundFromLocal());
  }

  ngOnDestroy(): void {
    this._cancelListener = null;
  }

  private _listenToAllActionsAndPersistData(): void {
    this._actions$.pipe(
      takeUntil(this._cancelListener),
      tap((_) => {
        this._storageService.setPokemonFoundToLocal(this._appService.getCurrentAppState());
      })
    ).subscribe();
  }
}
