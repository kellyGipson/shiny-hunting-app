import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { activeMenuType } from '../../types/app.types';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly activeMenuSource = new BehaviorSubject<activeMenuType>("counter");
  readonly activeMenu: Observable<activeMenuType> = this.activeMenuSource.asObservable();

  readonly addShinyOpenSource = new BehaviorSubject<boolean>(false);
  readonly addShinyOpen: Observable<boolean> = this.addShinyOpenSource.asObservable();

  constructor() {
  }

  getActiveMenu(): Observable<activeMenuType> { return this.activeMenu; }

  /**
   *
   * @param value Value to be passed into the add shiny form.
   */
  setActiveMenu(menu: activeMenuType, value?: number): void {
    this.activeMenuSource.next(menu);
  }

  getAddShinyOpen(): Observable<boolean> { return this.addShinyOpen }

  toggleAddShinyOpen(): void { this.addShinyOpenSource.next(!this.addShinyOpenSource.value) }
}
